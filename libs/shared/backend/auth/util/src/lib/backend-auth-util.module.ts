import { Inject, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuth } from './providers/jwt.auth';
import { JwtStrategy } from './strategies/jwt.strategy';
import {
  AUTH_MODULE_OPTIONS,
  ConfigurableModuleClass,
  OPTIONS_TYPE,
} from './backend-auth-util.module-definition';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { BackendUsersDataAccessModule } from '@nexanode/backend-users-data-access';
import { BackendUsersRolesDataAccessModule } from '@nexanode/backend-users-roles-data-access';
import { BackendRolesPermissionsDataAccessModule } from '@nexanode/backend-roles-permissions-data-access';
import { BackendPermissionsDataAccessModule } from '@nexanode/backend-permissions-data-access';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: process.env['JWT_SECRET'],
      signOptions: {
        expiresIn: parseInt(process.env['JWT_EXPIRES_IN'] || '', 10),
        audience: process.env['JWT_AUDIENCE'],
        issuer: process.env['JWT_ISSUER'],
      },
    }),
    BackendUsersDataAccessModule,
    BackendUsersRolesDataAccessModule,
    BackendRolesPermissionsDataAccessModule,
    BackendPermissionsDataAccessModule,
  ],
})
export class BackendAuthUtilModule extends ConfigurableModuleClass {
  constructor(@Inject(AUTH_MODULE_OPTIONS) private options: string | symbol) {
    super();
  }

  static register(options: typeof OPTIONS_TYPE) {
    switch (true) {
      case options.authStrategies.includes('jwt'):
        return {
          ...super.register(options),
          providers: [
            {
              provide: AUTH_MODULE_OPTIONS,
              useValue: options,
            },
            { provide: AuthService, useClass: JwtAuth },
            JwtAuth,
            JwtStrategy,
          ],
        };
        break;
      default:
        throw new Error('Unsupported auth strategy');
    }
  }
}
