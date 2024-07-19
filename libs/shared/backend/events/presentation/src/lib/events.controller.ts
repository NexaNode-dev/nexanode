import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { EventsService } from '@nexanode/backend-events-application';
import { Rbac } from '@nexanode/backend-rbac-util';
import { CreateEventDto } from './dtos/create-event.dto';
import { UpdateEventDto } from './dtos/update-event.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Rbac({ action: 'read', subject: 'Event' })
  @Get()
  async getEvents(@Query() query: never) {
    return this.eventsService.getEvents(query);
  }

  @Rbac({ action: 'read', subject: 'Event' })
  @Get('id')
  async getEventById(@Param('id') id: string) {
    return this.eventsService.getEventById(id);
  }

  @Rbac({ action: 'create', subject: 'Event' })
  @Post()
  async createEvent(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.createEvent(createEventDto);
  }

  @Rbac({ action: 'update', subject: 'Event' })
  @Patch('id')
  async updateEvent(
    @Param('id') id: string,
    @Body() UpdateEventDto: UpdateEventDto,
  ) {
    return this.eventsService.updateEvent(id, UpdateEventDto);
  }

  @Rbac({ action: 'delete', subject: 'Event' })
  @Delete('id')
  async deleteEvent(@Param('id') id: string) {
    return this.eventsService.deleteEvent(id);
  }
}
