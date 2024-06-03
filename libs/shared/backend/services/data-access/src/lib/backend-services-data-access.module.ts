import { Module } from '@nestjs/common';
import { ServicesRepository } from './services.repository';
import { Service } from './service.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Service])],
  providers: [ServicesRepository],
  exports: [ServicesRepository, TypeOrmModule],
})
export class BackendServicesDataAccessModule {}
