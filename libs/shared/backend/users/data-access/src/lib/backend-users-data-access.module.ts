import { Module } from '@nestjs/common';
import { BackendUsersDataAccessService } from './backend-users-data-access.service';
import { UsersRepository } from './users.repository';

@Module({
  controllers: [],
  providers: [BackendUsersDataAccessService, UsersRepository],
  exports: [BackendUsersDataAccessService],
})
export class BackendUsersDataAccessModule {}
