import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { BackendEventsDataAccessModule } from '@nexanode/backend-events-data-access';

@Module({
  imports: [BackendEventsDataAccessModule],
  providers: [EventsService],
  exports: [EventsService],
})
export class BackendEventsApplicationModule {}
