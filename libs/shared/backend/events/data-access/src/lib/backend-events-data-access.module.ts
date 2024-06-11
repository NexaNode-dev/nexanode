import { Module } from '@nestjs/common';
import { EventsRepository } from './events.repository';

@Module({
  controllers: [],
  providers: [EventsRepository],
  exports: [],
})
export class BackendEventsDataAccessModule {}
