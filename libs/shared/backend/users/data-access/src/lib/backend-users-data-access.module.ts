import { Module } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Module({
  controllers: [],
  providers: [UsersRepository],
  exports: [UsersRepository],
})
export class BackendUsersDataAccessModule {}
