import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { IUser } from '@nexanode/domain-interfaces';
import { LoginDto } from '../dtos/login.dto';
import { RegisterDto } from '../dtos/register.dto';
import { UsersRepository } from '@nexanode/backend-users-data-access';
import { HashingService } from '@nexanode/backend-hashing-util';
import { JwtService } from '@nestjs/jwt';
import { UsersRolesRepository } from '@nexanode/backend-users-roles-data-access';
import { RolesPermissionsRepository } from '@nexanode/backend-roles-permissions-data-access';
import { PermissionsRepository } from '@nexanode/backend-permissions-data-access';
import { RolesRepository } from '@nexanode/backend-roles-data-access';
import { DataSource } from 'typeorm';

@Injectable()
export class JwtAuth implements AuthService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
  ) {}
  async register(registerDto: RegisterDto): Promise<IUser> {
    if (registerDto.password !== registerDto.confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }
    return await this.dataSource.transaction(async (manager) => {
      const usersRepository = manager.getCustomRepository(UsersRepository);
      const rolesRepository = manager.getCustomRepository(RolesRepository);
      const usersRolesRepository =
        manager.getCustomRepository(UsersRolesRepository);
      const pwd = await this.hashingService.hash(registerDto.password);
      const user = await usersRepository.create({
        ...registerDto,
        password: pwd,
      });
      const role = (
        await rolesRepository.findAll({
          where: [{ name: 'user' }],
          take: 1,
        })
      )[0];
      await usersRolesRepository.create({
        userId: user.id,
        roleId: role.id,
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
  }
  async login(loginDto: LoginDto): Promise<{ user: IUser }> {
    return await this.dataSource.transaction(async (manager) => {
      const usersRepository = manager.getCustomRepository(UsersRepository);
      const userRolesRepository =
        manager.getCustomRepository(UsersRolesRepository);
      const rolesPermissionsRepository = manager.getCustomRepository(
        RolesPermissionsRepository,
      );
      const permissionsRepository = manager.getCustomRepository(
        PermissionsRepository,
      );
      const user = (
        await usersRepository.findAll({
          where: [{ name: loginDto.credential, email: loginDto.credential }],
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
          take: 1,
        })
      )[0]; //TODO: Repositories should have findOne method with find options and findOneById method
      if (!user) {
        throw new BadRequestException('Invalid credentials');
      }
      const isPasswordValid = await this.hashingService.compare(
        loginDto.password,
        user.password || '',
      );
      if (!isPasswordValid) {
        throw new BadRequestException('Invalid password');
      }
      const userRoles = await userRolesRepository.findAll({
        where: [{ userId: user.id }],
        select: ['roleId'],
      });
      const rolePermissions = await rolesPermissionsRepository.findAll({
        where: userRoles.map((r) => ({ roleId: r.roleId })),
      });
      const permissions = await permissionsRepository.findAll({
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
    const usersRepository =
      this.dataSource.getCustomRepository(UsersRepository);
    const user = (
      await usersRepository.findAll({
        where: [{ id: userId, accessToken: token }],
        take: 1,
      })
    ).pop();
    if (!user) {
      throw new BadRequestException('Invalid token');
    }
    await usersRepository.update(user.id, { isActive: true });
    return true;
  }
}
