/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  IMedia,
  IMediaStorageType,
  IMediaType,
  IPermission,
  IRole,
  IService,
  IUser,
} from '@nexanode/domain-interfaces';
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

    // Seed media
    const mediaRepository = queryRunner.manager.getRepository<IMedia>('Media');

    const masterclass1 = await mediaRepository.save(
      await mediaRepository.create({
        name: 'Masterclass 1',
        originalName: 'masterclass1.jpg',
        type: IMediaType.IMAGE,
        storageType: IMediaStorageType.LOCAL,
        metadata: {
          size: 12345,
          mimeType: 'image/jpeg',
          uploadDate: new Date(),
          dimensions: {
            width: 1920,
            height: 1080,
          },
          format: 'JPEG',
        },
        url: 'assets/masterclass1.jpg',
        userId: adminUser.id,
      }),
    );

    const masterclass2 = await mediaRepository.save(
      await mediaRepository.create({
        name: 'Masterclass 2',
        originalName: 'masterclass2.jpg',
        type: IMediaType.IMAGE,
        storageType: IMediaStorageType.LOCAL,
        metadata: {
          size: 12345,
          mimeType: 'image/jpeg',
          uploadDate: new Date(),
          dimensions: {
            width: 1920,
            height: 1080,
          },
          format: 'JPEG',
        },
        url: 'assets/masterclass2.jpg',
        userId: adminUser.id,
      }),
    );

    const masterclass3 = await mediaRepository.save(
      await mediaRepository.create({
        name: 'Masterclass 3',
        originalName: 'masterclass3.jpg',
        type: IMediaType.IMAGE,
        storageType: IMediaStorageType.LOCAL,
        metadata: {
          size: 12345,
          mimeType: 'image/jpeg',
          uploadDate: new Date(),
          dimensions: {
            width: 1920,
            height: 1080,
          },
          format: 'JPEG',
        },
        url: 'assets/masterclass3.jpg',
        userId: adminUser.id,
      }),
    );

    const teambuilding1 = await mediaRepository.save(
      await mediaRepository.create({
        name: 'Teambuilding 1',
        originalName: 'teambuilding1.jpg',
        type: IMediaType.IMAGE,
        storageType: IMediaStorageType.LOCAL,
        metadata: {
          size: 12345,
          mimeType: 'image/jpeg',
          uploadDate: new Date(),
          dimensions: {
            width: 1920,
            height: 1080,
          },
          format: 'JPEG',
        },
        url: 'assets/teambuilding1.jpg',
        userId: adminUser.id,
      }),
    );

    const teambuilding2 = await mediaRepository.save(
      await mediaRepository.create({
        name: 'Teambuilding 2',
        originalName: 'teambuilding2.jpg',
        type: IMediaType.IMAGE,
        storageType: IMediaStorageType.LOCAL,
        metadata: {
          size: 12345,
          mimeType: 'image/jpeg',
          uploadDate: new Date(),
          dimensions: {
            width: 1920,
            height: 1080,
          },
          format: 'JPEG',
        },
        url: 'assets/teambuilding2.jpg',
        userId: adminUser.id,
      }),
    );

    //Seed service categories
    const serviceCategoriesRepository =
      queryRunner.manager.getRepository('Category');

    serviceCategoriesRepository.metadata.tablePath = 'service_categories';

    const masterclasses = await serviceCategoriesRepository.save(
      await serviceCategoriesRepository.create({
        name: 'masterclasses',
        description:
          'Ontdek praktische kennis en vaardigheden tijdens onze educatieve masterclasses, ontworpen om de kracht van intermitterende prikkels te benutten voor persoonlijke en professionele groei.',
      }),
    );

    const teambuildings = await serviceCategoriesRepository.save(
      await serviceCategoriesRepository.create({
        name: 'teambuildings',
        description:
          'Ga op een avontuurlijke reis van teamversterking met onze dynamische teambuildingsessies, boordevol spannende activiteiten en ervaringen om de samenwerking te verbeteren en de teamband te versterken.',
      }),
    );

    // Seed services
    const servicesRepository =
      queryRunner.manager.getRepository<IService>('Service');

    const mindBodyMasterclass = await servicesRepository.save(
      await servicesRepository.create({
        name: 'Mind & Body Masterclass',
        summary:
          'Ontdek de kracht van de geest en het lichaam met onze Mind & Body Masterclass. Leer hoe je intermitterende prikkels zoals ademhaling en koude kunt gebruiken om je energie te optimaliseren, stress te verminderen en je algehele welzijn te verbeteren. Deze masterclass biedt praktische technieken en inzichten die je kunt integreren in je dagelijks leven voor langdurige positieve verandering, zowel persoonlijk als professioneel.',
        categoryId: masterclasses.id,
        featuredImage: masterclass1.id,
      }),
    );

    const performanceMasterclass = await servicesRepository.save(
      await servicesRepository.create({
        name: 'Performance Masterclass',
        summary:
          'Wil je jouw persoonlijke en professionele prestaties naar een hoger niveau tillen? Onze Performance Masterclass is precies wat je nodig hebt. Leer hoe je intermitterende prikkels zoals ademhaling, koude en voeding kunt gebruiken om je focus, productiviteit en veerkracht te vergroten. Tijdens deze masterclass wordt er ook gekookt voor de deelnemers, zodat je een lunch krijgt die aansluit bij wat je leert, wat zorgt voor een complete ervaring. Ontdek hoe deze technieken en strategieën kunnen worden toegepast in de professionele wereld voor maximale impact.',
        categoryId: masterclasses.id,
        featuredImage: masterclass2.id,
      }),
    );

    const teamDynamicsMasterclass = await servicesRepository.save(
      await servicesRepository.create({
        name: 'Team Dynamics Masterclass',
        summary:
          'Sterke teams zijn de ruggengraat van succesvolle organisaties. In onze Team Dynamics Masterclass leer je hoe je een cultuur van samenwerking en synergie kunt creëren binnen je team door gebruik te maken van intermitterende prikkels zoals ademhaling, koude, warmte en voeding. Ontdek hoe je effectief kunt communiceren, conflicten kunt oplossen en elkaar kunt ondersteunen om gezamenlijke doelen te bereiken. Tijdens deze masterclass wordt er ook gekookt voor de deelnemers, zodat je een lunch krijgt die aansluit bij wat je leert, wat zorgt voor een complete ervaring. Deze masterclass biedt hands-on oefeningen en teambuildingactiviteiten om de banden te versterken en de prestaties van je team te verbeteren, zowel op de werkvloer als daarbuiten.',
        categoryId: masterclasses.id,
        featuredImage: masterclass3.id,
      }),
    );

    const adventureBoostTeambuilding = await servicesRepository.save(
      await servicesRepository.create({
        name: 'Adventure Boost (Halve dag Team Building)',
        summary:
          'Duik in een halve dag vol avontuurlijke uitdagingen en verrijkende activiteiten om de samenwerking en teamgeest te versterken. Deze sessie omvat een ademhalingssessie voor focus en verbinding, spannende sportieve teamuitdagingen en een gezonde lunch. Maak je klaar om te groeien als team terwijl je jezelf uitdaagt en nieuwe hoogten bereikt.',
        categoryId: teambuildings.id,
        featuredImage: teambuilding1.id,
      }),
    );

    const ultiemeTeambuilding = await servicesRepository.save(
      await servicesRepository.create({
        name: 'Ultieme Teamuitdaging (Hele dag Team Building)',
        summary:
          'Neem deel aan een volledige dag vol avontuur en teamwork, met alles wat de Adventure Boost biedt, plus extra individuele uitdagingen. Naast de ademhalingssessie, sportieve teamuitdagingen en gezonde lunch, zullen individuele uitdagingen met intermitterende prikkels zoals koude en warmte je team tot het uiterste testen. Ontdek nieuwe grenzen, bouw vertrouwen op en versterk de banden die je team onverslaanbaar maken.',
        categoryId: teambuildings.id,
        featuredImage: teambuilding2.id,
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
