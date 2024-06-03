import { Module } from '@nestjs/common';
import { ServicesRepository } from './services.repository';

@Module({
  controllers: [],
  providers: [ServicesRepository],
  exports: [],
})
export class BackendServicesDataAccessModule {}
