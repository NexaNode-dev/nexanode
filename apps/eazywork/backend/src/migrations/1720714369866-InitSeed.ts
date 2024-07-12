/* eslint-disable @typescript-eslint/no-unused-vars */
import { IPermission, IRole, IUser } from '@nexanode/domain-interfaces';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { hash } from 'bcrypt';

export class InitSeed1720714369866 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Seed permissions
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

    const organisationReadPermission = await permissionsRepository.save(
      await permissionsRepository.create({
        name: 'Organisation Read',
        description: 'Organisation read permission',
        action: 'read',
        subject: 'Organisation',
      }),
    );

    const organisationCreatePermission = await permissionsRepository.save(
      await permissionsRepository.create({
        name: 'Organisation Create',
        description: 'Organisation create permission',
        action: 'create',
        subject: 'Organisation',
      }),
    );

    const organisationUpdatePermission = await permissionsRepository.save(
      await permissionsRepository.create({
        name: 'Organisation Update',
        description: 'Organisation update permission',
        action: 'update',
        subject: 'Organisation',
      }),
    );

    const organisationDeletePermission = await permissionsRepository.save(
      await permissionsRepository.create({
        name: 'Organisation Delete',
        description: 'Organisation delete permission',
        action: 'delete',
        subject: 'Organisation',
      }),
    );

    const jobOfferReadPermission = await permissionsRepository.save(
      await permissionsRepository.create({
        name: 'Job Offer Read',
        description: 'Job Offer read permission',
        action: 'read',
        subject: 'Job Offer',
      }),
    );

    const jobOfferCreatePermission = await permissionsRepository.save(
      await permissionsRepository.create({
        name: 'Job Offer Create',
        description: 'Job Offer create permission',
        action: 'create',
        subject: 'Job Offer',
      }),
    );

    const jobOfferUpdatePermission = await permissionsRepository.save(
      await permissionsRepository.create({
        name: 'Job Offer Update',
        description: 'Job Offer update permission',
        action: 'update',
        subject: 'Job Offer',
      }),
    );

    const jobOfferDeletePermission = await permissionsRepository.save(
      await permissionsRepository.create({
        name: 'Job Offer Delete',
        description: 'Job Offer delete permission',
        action: 'delete',
        subject: 'Job Offer',
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

    const companyUserRole = await rolesRepository.save(
      await rolesRepository.create({
        name: 'Company User',
        description: 'Company User role',
      }),
    );

    // Assign permissions to roles
    const RolePermissionRepository =
      queryRunner.manager.getRepository('RolePermission');

    await RolePermissionRepository.save(
      await RolePermissionRepository.create({
        roleId: adminRole.id,
        permissionId: adminPermission.id,
      }),
    );

    await RolePermissionRepository.save(
      await RolePermissionRepository.create({
        roleId: guestRole.id,
        permissionId: authRegisterPermission.id,
      }),
    );

    await RolePermissionRepository.save(
      await RolePermissionRepository.create({
        roleId: guestRole.id,
        permissionId: authLoginPermission.id,
      }),
    );

    await RolePermissionRepository.save(
      await RolePermissionRepository.create({
        roleId: guestRole.id,
        permissionId: authActivatePermission.id,
      }),
    );

    await RolePermissionRepository.save(
      await RolePermissionRepository.create({
        roleId: companyUserRole.id,
        permissionId: authForgotPasswordPermission.id,
      }),
    );

    await RolePermissionRepository.save(
      await RolePermissionRepository.create({
        roleId: companyUserRole.id,
        permissionId: authResetPasswordPermission.id,
      }),
    );

    await RolePermissionRepository.save(
      await RolePermissionRepository.create({
        roleId: companyUserRole.id,
        permissionId: jobOfferReadPermission.id,
      }),
    );

    await RolePermissionRepository.save(
      await RolePermissionRepository.create({
        roleId: companyUserRole.id,
        permissionId: jobOfferCreatePermission.id,
      }),
    );

    await RolePermissionRepository.save(
      await RolePermissionRepository.create({
        roleId: companyUserRole.id,
        permissionId: jobOfferUpdatePermission.id,
      }),
    );

    await RolePermissionRepository.save(
      await RolePermissionRepository.create({
        roleId: companyUserRole.id,
        permissionId: jobOfferDeletePermission.id,
      }),
    );

    await RolePermissionRepository.save(
      await RolePermissionRepository.create({
        roleId: companyUserRole.id,
        permissionId: mediaReadPermission.id,
      }),
    );

    await RolePermissionRepository.save(
      await RolePermissionRepository.create({
        roleId: companyUserRole.id,
        permissionId: mediaCreatePermission.id,
      }),
    );

    await RolePermissionRepository.save(
      await RolePermissionRepository.create({
        roleId: companyUserRole.id,
        permissionId: mediaUpdatePermission.id,
      }),
    );

    await RolePermissionRepository.save(
      await RolePermissionRepository.create({
        roleId: companyUserRole.id,
        permissionId: mediaDeletePermission.id,
      }),
    );

    await RolePermissionRepository.save(
      await RolePermissionRepository.create({
        roleId: companyUserRole.id,
        permissionId: organisationReadPermission.id,
      }),
    );

    await RolePermissionRepository.save(
      await RolePermissionRepository.create({
        roleId: companyUserRole.id,
        permissionId: organisationCreatePermission.id,
      }),
    );

    await RolePermissionRepository.save(
      await RolePermissionRepository.create({
        roleId: companyUserRole.id,
        permissionId: organisationUpdatePermission.id,
      }),
    );

    await RolePermissionRepository.save(
      await RolePermissionRepository.create({
        roleId: companyUserRole.id,
        permissionId: organisationDeletePermission.id,
      }),
    );

    // Seed users
    const usersRepository = queryRunner.manager.getRepository<IUser>('User');

    const password = await hash('admin', 10);

    const adminUser = await usersRepository.save(
      await usersRepository.create({
        userName: 'Nabil',
        email: 'nabil@eazywork.nl',
        password,
        isActive: true,
        loginExpires: new Date('1900-01-01T00:00:00.000Z'),
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
