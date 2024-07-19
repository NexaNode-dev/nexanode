/* eslint-disable @typescript-eslint/no-unused-vars */
import { IPermission, IRole, IUser } from '@nexanode/domain-interfaces';
import { genSalt, hash } from 'bcrypt';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitSeed1721393165106 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const permissionsRepository =
      queryRunner.manager.getRepository<IPermission>('Permission');

    const adminPermission = await permissionsRepository.save(
      await permissionsRepository.create({
        name: 'Admin',
        description: 'Admin permission',
        action: 'manage',
        subject: 'all',
      }),
    );

    const userReadPermission = await permissionsRepository.save(
      await permissionsRepository.create({
        name: 'User Read',
        description: 'User read permission',
        action: 'read',
        subject: 'User',
      }),
    );

    const userCreatePermission = await permissionsRepository.save(
      await permissionsRepository.create({
        name: 'User Create',
        description: 'User create permission',
        action: 'create',
        subject: 'User',
      }),
    );

    const userUpdatePermission = await permissionsRepository.save(
      await permissionsRepository.create({
        name: 'User Update',
        description: 'User update permission',
        action: 'update',
        subject: 'User',
      }),
    );

    const userDeletePermission = await permissionsRepository.save(
      await permissionsRepository.create({
        name: 'User Delete',
        description: 'User delete permission',
        action: 'delete',
        subject: 'User',
      }),
    );

    const roleReadPermission = await permissionsRepository.save(
      await permissionsRepository.create({
        name: 'Role Read',
        description: 'Role read permission',
        action: 'read',
        subject: 'Role',
      }),
    );

    const roleCreatePermission = await permissionsRepository.save(
      await permissionsRepository.create({
        name: 'Role Create',
        description: 'Role create permission',
        action: 'create',
        subject: 'Role',
      }),
    );

    const roleUpdatePermission = await permissionsRepository.save(
      await permissionsRepository.create({
        name: 'Role Update',
        description: 'Role update permission',
        action: 'update',
        subject: 'Role',
      }),
    );

    const roleDeletePermission = await permissionsRepository.save(
      await permissionsRepository.create({
        name: 'Role Delete',
        description: 'Role delete permission',
        action: 'delete',
        subject: 'Role',
      }),
    );

    const permissionReadPermission = await permissionsRepository.save(
      await permissionsRepository.create({
        name: 'Permission Read',
        description: 'Permission read permission',
        action: 'read',
        subject: 'Permission',
      }),
    );

    const permissionCreatePermission = await permissionsRepository.save(
      await permissionsRepository.create({
        name: 'Permission Create',
        description: 'Permission create permission',
        action: 'create',
        subject: 'Permission',
      }),
    );

    const permissionUpdatePermission = await permissionsRepository.save(
      await permissionsRepository.create({
        name: 'Permission Update',
        description: 'Permission update permission',
        action: 'update',
        subject: 'Permission',
      }),
    );

    const permissionDeletePermission = await permissionsRepository.save(
      await permissionsRepository.create({
        name: 'Permission Delete',
        description: 'Permission delete permission',
        action: 'delete',
        subject: 'Permission',
      }),
    );

    const mediaReadPermission = await permissionsRepository.save(
      await permissionsRepository.create({
        name: 'Media Read',
        description: 'Media read permission',
        action: 'read',
        subject: 'Media',
      }),
    );

    const mediaCreatePermission = await permissionsRepository.save(
      await permissionsRepository.create({
        name: 'Media Create',
        description: 'Media create permission',
        action: 'create',
        subject: 'Media',
      }),
    );

    const mediaUpdatePermission = await permissionsRepository.save(
      await permissionsRepository.create({
        name: 'Media Update',
        description: 'Media update permission',
        action: 'update',
        subject: 'Media',
      }),
    );

    const mediaDeletePermission = await permissionsRepository.save(
      await permissionsRepository.create({
        name: 'Media Delete',
        description: 'Media delete permission',
        action: 'delete',
        subject: 'Media',
      }),
    );

    const eventReadPermission = await permissionsRepository.save(
      await permissionsRepository.create({
        name: 'Event Read',
        description: 'Event read permission',
        action: 'read',
        subject: 'Event',
      }),
    );

    const eventCreatePermission = await permissionsRepository.save(
      await permissionsRepository.create({
        name: 'Event Create',
        description: 'Event create permission',
        action: 'create',
        subject: 'Event',
      }),
    );

    const eventUpdatePermission = await permissionsRepository.save(
      await permissionsRepository.create({
        name: 'Event Update',
        description: 'Event update permission',
        action: 'update',
        subject: 'Event',
      }),
    );

    const eventDeletePermission = await permissionsRepository.save(
      await permissionsRepository.create({
        name: 'Event Delete',
        description: 'Event delete permission',
        action: 'delete',
        subject: 'Event',
      }),
    );

    const serviceReadPermission = await permissionsRepository.save(
      await permissionsRepository.create({
        name: 'Service Read',
        description: 'Service read permission',
        action: 'read',
        subject: 'Service',
      }),
    );

    const serviceCreatePermission = await permissionsRepository.save(
      await permissionsRepository.create({
        name: 'Service Create',
        description: 'Service create permission',
        action: 'create',
        subject: 'Service',
      }),
    );

    const serviceUpdatePermission = await permissionsRepository.save(
      await permissionsRepository.create({
        name: 'Service Update',
        description: 'Service update permission',
        action: 'update',
        subject: 'Service',
      }),
    );

    const serviceDeletePermission = await permissionsRepository.save(
      await permissionsRepository.create({
        name: 'Service Delete',
        description: 'Service delete permission',
        action: 'delete',
        subject: 'Service',
      }),
    );

    const categoryReadPermission = await permissionsRepository.save(
      await permissionsRepository.create({
        name: 'Category Read',
        description: 'Category read permission',
        action: 'read',
        subject: 'Category',
      }),
    );

    const categoryCreatePermission = await permissionsRepository.save(
      await permissionsRepository.create({
        name: 'Category Create',
        description: 'Category create permission',
        action: 'create',
        subject: 'Category',
      }),
    );

    const categoryUpdatePermission = await permissionsRepository.save(
      await permissionsRepository.create({
        name: 'Category Update',
        description: 'Category update permission',
        action: 'update',
        subject: 'Category',
      }),
    );

    const categoryDeletePermission = await permissionsRepository.save(
      await permissionsRepository.create({
        name: 'Category Delete',
        description: 'Category delete permission',
        action: 'delete',
        subject: 'Category',
      }),
    );

    const bookingReadPermission = await permissionsRepository.save(
      await permissionsRepository.create({
        name: 'Booking Read',
        description: 'Booking read permission',
        action: 'read',
        subject: 'Booking',
      }),
    );

    const bookingCreatePermission = await permissionsRepository.save(
      await permissionsRepository.create({
        name: 'Booking Create',
        description: 'Booking create permission',
        action: 'create',
        subject: 'Booking',
      }),
    );

    const bookingUpdatePermission = await permissionsRepository.save(
      await permissionsRepository.create({
        name: 'Booking Update',
        description: 'Booking update permission',
        action: 'update',
        subject: 'Booking',
      }),
    );

    const bookingDeletePermission = await permissionsRepository.save(
      await permissionsRepository.create({
        name: 'Booking Delete',
        description: 'Booking delete permission',
        action: 'delete',
        subject: 'Booking',
      }),
    );

    const bookingPaymentPermission = await permissionsRepository.save(
      await permissionsRepository.create({
        name: 'Booking Payment',
        description: 'Booking payment permission',
        action: 'pay',
        subject: 'Booking',
      }),
    );

    const bookingCancelPermission = await permissionsRepository.save(
      await permissionsRepository.create({
        name: 'Booking Cancel',
        description: 'Booking cancel permission',
        action: 'cancel',
        subject: 'Booking',
      }),
    );

    const bookingConfirmPermission = await permissionsRepository.save(
      await permissionsRepository.create({
        name: 'Booking Confirm',
        description: 'Booking confirm permission',
        action: 'confirm',
        subject: 'Booking',
      }),
    );

    const authRegisterPermission = await permissionsRepository.save(
      await permissionsRepository.create({
        name: 'Auth Register',
        description: 'Auth register permission',
        action: 'register',
        subject: 'Auth',
      }),
    );

    const authLoginPermission = await permissionsRepository.save(
      await permissionsRepository.create({
        name: 'Auth Login',
        description: 'Auth login permission',
        action: 'login',
        subject: 'Auth',
      }),
    );

    const authActivatePermission = await permissionsRepository.save(
      await permissionsRepository.create({
        name: 'Auth Activate',
        description: 'Auth activate permission',
        action: 'activate',
        subject: 'Auth',
      }),
    );

    const authForgotPasswordPermission = await permissionsRepository.save(
      await permissionsRepository.create({
        name: 'Auth Forgot Password',
        description: 'Auth forgot password permission',
        action: 'forgot-password',
        subject: 'Auth',
      }),
    );

    const authResetPasswordPermission = await permissionsRepository.save(
      await permissionsRepository.create({
        name: 'Auth Reset Password',
        description: 'Auth reset password permission',
        action: 'reset-password',
        subject: 'Auth',
      }),
    );

    // Seed roles
    const rolesRepository = queryRunner.manager.getRepository<IRole>('Role');

    const adminRole = await rolesRepository.save(
      await rolesRepository.create({
        name: 'Admin',
        description: 'Admin role',
      }),
    );

    const guestRole = await rolesRepository.save(
      await rolesRepository.create({
        name: 'Guest',
        description: 'Guest role',
      }),
    );

    const userRole = await rolesRepository.save(
      await rolesRepository.create({
        name: 'User',
        description: 'Default user role',
      }),
    );

    // Assign permissions to roles
    const rolePermissionRepository =
      queryRunner.manager.getRepository('RolePermission');

    await rolePermissionRepository.save(
      await rolePermissionRepository.create({
        roleId: adminRole.id,
        permissionId: adminPermission.id,
      }),
    );

    await rolePermissionRepository.save(
      await rolePermissionRepository.create({
        roleId: guestRole.id,
        permissionId: authRegisterPermission.id,
      }),
    );

    await rolePermissionRepository.save(
      await rolePermissionRepository.create({
        roleId: guestRole.id,
        permissionId: authLoginPermission.id,
      }),
    );

    await rolePermissionRepository.save(
      await rolePermissionRepository.create({
        roleId: guestRole.id,
        permissionId: authActivatePermission.id,
      }),
    );

    await rolePermissionRepository.save(
      await rolePermissionRepository.create({
        roleId: userRole.id,
        permissionId: authForgotPasswordPermission.id,
      }),
    );

    await rolePermissionRepository.save(
      await rolePermissionRepository.create({
        roleId: userRole.id,
        permissionId: authResetPasswordPermission.id,
      }),
    );

    await rolePermissionRepository.save(
      await rolePermissionRepository.create({
        roleId: userRole.id,
        permissionId: userReadPermission.id,
      }),
    );

    await rolePermissionRepository.save(
      await rolePermissionRepository.create({
        roleId: userRole.id,
        permissionId: serviceReadPermission.id,
      }),
    );

    await rolePermissionRepository.save(
      await rolePermissionRepository.create({
        roleId: userRole.id,
        permissionId: eventReadPermission.id,
      }),
    );

    await rolePermissionRepository.save(
      await rolePermissionRepository.create({
        roleId: userRole.id,
        permissionId: categoryReadPermission.id,
      }),
    );

    await rolePermissionRepository.save(
      await rolePermissionRepository.create({
        roleId: userRole.id,
        permissionId: bookingReadPermission.id,
      }),
    );

    await rolePermissionRepository.save(
      await rolePermissionRepository.create({
        roleId: userRole.id,
        permissionId: bookingCreatePermission.id,
      }),
    );

    await rolePermissionRepository.save(
      await rolePermissionRepository.create({
        roleId: userRole.id,
        permissionId: bookingUpdatePermission.id,
      }),
    );

    // Seed users
    const usersRepository = queryRunner.manager.getRepository<IUser>('User');

    const password = await hash('admin', 10);

    const adminUser = await usersRepository.save(
      await usersRepository.create({
        userName: 'sjoerd',
        email: 'sjoerd@lifeperformance.be',
        password,
        isActive: true,
      }),
    );

    const guestPassword = await hash(
      Math.random().toString(36).substring(16),
      await genSalt(),
    );

    const guestUser = await usersRepository.save(
      await usersRepository.create({
        userName: 'guest',
        email: 'guest@lifeperformance.be',
        password: guestPassword,
        isActive: true,
      }),
    );

    // Seed user roles
    const usersRolesRepository = queryRunner.manager.getRepository('UserRole');

    await usersRolesRepository.save(
      await usersRolesRepository.create({
        userId: adminUser.id,
        roleId: adminRole.id,
      }),
    );

    await usersRolesRepository.save(
      await usersRolesRepository.create({
        userId: guestUser.id,
        roleId: guestRole.id,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.getRepository('UserRole').delete({});
    await queryRunner.manager.getRepository<IUser>('User').delete({});
    await queryRunner.manager.getRepository('RolePermission').delete({});
    await queryRunner.manager.getRepository<IRole>('Role').delete({});
    await queryRunner.manager
      .getRepository<IPermission>('Permission')
      .delete({});
  }
}
