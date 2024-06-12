import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { BackendEventsApplicationModule } from '@nexanode/backend-events-application';

@Module({
  imports: [BackendEventsApplicationModule],
  controllers: [EventsController],
  providers: [],
  exports: [],
})
export class BackendEventsPresentationModule {}
