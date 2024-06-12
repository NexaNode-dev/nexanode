import { Test, TestingModule } from '@nestjs/testing';
import { EventsService } from './events.service';
import { eventsFactory } from '@nexanode/testing-data-mocks-utils';
import { EventsRepository } from '@nexanode/backend-events-data-access';

describe('EventsService', () => {
  let service: EventsService;

  const expectedEvents = eventsFactory();

  const expectedEvent = expectedEvents[0];

  const mockRepository = {
    getEvents: jest.fn().mockResolvedValue(expectedEvents),
    getEvent: jest.fn().mockResolvedValue(expectedEvent),
    createEvent: jest.fn().mockResolvedValue(expectedEvent),
    updateEvent: jest.fn().mockResolvedValue(expectedEvent),
    deleteEvent: jest.fn().mockResolvedValue(expectedEvent.id),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventsService],
    })
      .useMocker((token) => {
        if (token === EventsRepository) {
          return mockRepository;
        }
        return;
      })
      .compile();

    service = module.get<EventsService>(EventsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('getEvents', () => {
    it('should return all events', async () => {
      const events = await service.getEvents({} as never);
      expect(events).toEqual(expectedEvents);
    });
  });
  describe('getEvent', () => {
    it('should return an event', async () => {
      const event = await service.getEvent({} as never);
      expect(event).toEqual(expectedEvent);
    });
  });
  describe('createEvent', () => {
    it('should create an event', async () => {
      const event = await service.createEvent({} as never);
      expect(event).toEqual(expectedEvent);
    });
  });
  describe('updateEvent', () => {
    it('should update an event', async () => {
      const event = await service.updateEvent('1', {} as never);
      expect(event).toEqual(expectedEvent);
    });
  });
  describe('deleteEvent', () => {
    it('should delete an event', async () => {
      const id = await service.deleteEvent('1');
      expect(id).toEqual(expectedEvent.id);
    });
  });
});
