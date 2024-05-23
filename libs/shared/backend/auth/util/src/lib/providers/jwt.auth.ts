import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { ILogin, IRegister, IUser } from '@nexanode/domain-interfaces';
import { UsersRepository } from '@nexanode/backend-users-data-access';
import { HashingService } from '@nexanode/backend-hashing-util';
import { JwtService } from '@nestjs/jwt';
import { UsersRolesRepository } from '@nexanode/backend-users-roles-data-access';
import { RolesPermissionsRepository } from '@nexanode/backend-roles-permissions-data-access';
import { PermissionsRepository } from '@nexanode/backend-permissions-data-access';
import { RolesRepository } from '@nexanode/backend-roles-data-access';
import { DataSource } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class JwtAuth implements AuthService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
    private readonly usersRepository: UsersRepository,
    private readonly rolesRepository: RolesRepository,
    private readonly usersRolesRepository: UsersRolesRepository,
    private readonly rolesPermissionsRepository: RolesPermissionsRepository,
    private readonly permissionsRepository: PermissionsRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}
  async register(register: IRegister): Promise<IUser> {
    if (register.password !== register.confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }
    return await this.dataSource.transaction(async (manager) => {
      const usersRepository = manager.withRepository(this.usersRepository);
      const rolesRepository = manager.withRepository(this.rolesRepository);
      const usersRolesRepository = manager.withRepository(
        this.usersRolesRepository,
      );
      const pwd = await this.hashingService.hash(register.password);
      const user = await usersRepository.createUser({
        ...register,
        password: pwd,
        accessToken: crypto.getRandomValues(new Uint32Array(1))[0].toString(),
      });
      const role = await rolesRepository.getRole({
        where: [
          { name: register.roleName || process.env['DEFAULT_ROLE'] || 'user' },
        ],
      });
      await usersRolesRepository.createUserRole({
        userId: user.id,
        roleId: role.id,
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userWithoutPassword } = user;
      this.eventEmitter.emit('user.registered', {
        email: user.email,
        name: user.userName,
      });
      return userWithoutPassword;
    });
  }
  async login(login: ILogin): Promise<{ user: IUser }> {
    return await this.dataSource.transaction(async (manager) => {
      const usersRepository = manager.withRepository(this.usersRepository);
      const userRolesRepository = manager.withRepository(
        this.usersRolesRepository,
      );
      const rolesPermissionsRepository = manager.withRepository(
        this.rolesPermissionsRepository,
      );
      const permissionsRepository = manager.withRepository(
        this.permissionsRepository,
      );
      const user = await usersRepository.getUser({
        where: [{ name: login.credential, email: login.credential }],
        select: [
          'id',
          'name',
          'email',
          'password',
          'accessToken',
          'loginExpires',
          'createdAt',
          'updatedAt',
        ],
      });
      if (!user) {
        throw new BadRequestException('Invalid credentials');
      }
      const isPasswordValid = await this.hashingService.compare(
        login.password,
        user.password || '',
      );
      if (!isPasswordValid) {
        throw new BadRequestException('Invalid password');
      }
      const userRoles = await userRolesRepository.getUserRoles({
        where: [{ userId: user.id }],
        select: ['roleId'],
      });
      const rolePermissions =
        await rolesPermissionsRepository.getRolePermissions({
          where: userRoles.map((r) => ({ roleId: r.roleId })),
        });
      const permissions = await permissionsRepository.getPermissions({
        where: rolePermissions.map((rp) => ({ id: rp.permissionId })),
      });
      user.accessToken = await this.jwtService.signAsync({
        sub: user.id,
        permissions,
      });
      user.loginExpires = new Date(
        Date.now() + parseInt(process.env['JWT_EXPIRES_IN'] || '6000', 10),
      );
      await usersRepository.update(user.id, { ...user });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userWithoutPassword } = user;
      return { user: userWithoutPassword };
    });
  }

  async activate(userId: string, token: string): Promise<boolean> {
    const user = await this.usersRepository.getUser({
      where: { id: userId, accessToken: token },
    });
    if (!user) {
      throw new BadRequestException('Invalid token');
    }
    await this.usersRepository.updateUser(user.id, { isActive: true });
    this.eventEmitter.emit('user.activated', {
      email: user.email,
      name: user.userName,
    });
    return true;
  }
}
