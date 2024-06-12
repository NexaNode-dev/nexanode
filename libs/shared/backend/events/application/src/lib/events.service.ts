import { Injectable } from '@nestjs/common';
import { EventsRepository } from '@nexanode/backend-events-data-access';
import { IEvent } from '@nexanode/domain-interfaces';

@Injectable()
export class EventsService {
  constructor(private readonly eventsRepository: EventsRepository) {}

  async getEvents(options: never): Promise<IEvent[]> {
    return this.eventsRepository.getEvents(options);
  }

  async getEvent(options: never): Promise<IEvent> {
    return this.eventsRepository.getEvent(options);
  }

  async createEvent(event: Partial<IEvent>): Promise<IEvent> {
    return this.eventsRepository.createEvent(event);
  }

  async updateEvent(id: string, event: Partial<IEvent>): Promise<IEvent> {
    return this.eventsRepository.updateEvent(id, event);
  }

  async deleteEvent(id: string): Promise<string> {
    return this.eventsRepository.deleteEvent(id);
  }
}
