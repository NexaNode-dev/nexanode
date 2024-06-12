import { Module } from '@nestjs/common';
import { EventsRepository } from './events.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event])],
  providers: [EventsRepository],
  exports: [EventsRepository, TypeOrmModule],
})
export class BackendEventsDataAccessModule {}
