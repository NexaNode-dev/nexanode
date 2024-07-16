import { Module } from '@nestjs/common';
import { MediaRepository } from './media.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Media } from './media.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Media])],
  providers: [MediaRepository],
  exports: [MediaRepository, TypeOrmModule],
})
export class BackendMediaDataAccessModule {}
