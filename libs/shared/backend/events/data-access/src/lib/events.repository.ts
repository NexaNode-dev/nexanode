import { Injectable, NotFoundException } from '@nestjs/common';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { Event } from './event.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EventsRepository extends Repository<Event> {
  constructor(
    @InjectRepository(Event)
    private readonly eventsRepository: Repository<Event>,
  ) {
    super(Event, eventsRepository.manager, eventsRepository.queryRunner);
  }

  getEvents(options: FindManyOptions<Event> = {}): Promise<Event[]> {
    return this.eventsRepository.find(options);
  }

  async getEvent(options: FindOneOptions<Event>): Promise<Event> {
    const event = await this.eventsRepository.findOne(options);
    if (!event) {
      throw new NotFoundException(
        `Event with options ${JSON.stringify(options)} not found`,
      );
    }
    return event;
  }

  createEvent(event: Partial<Event>): Promise<Event> {
    const newEvent = this.eventsRepository.create(event);
    return this.eventsRepository.save(newEvent);
  }

  async updateEvent(id: string, event: Partial<Event>): Promise<Event> {
    const updatedEvent = await this.eventsRepository.preload({
      id,
      ...event,
    });
    if (!updatedEvent) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }
    return this.eventsRepository.save(updatedEvent);
  }

  async deleteEvent(id: string): Promise<string> {
    const event = await this.getEvent({ where: { id } });
    await this.eventsRepository.remove(event);
    return id;
  }
}
