import { Test, TestingModule } from '@nestjs/testing';
import { EventsController } from './events.controller';
import { eventsFactory } from '@nexanode/testing-data-mocks-utils';
import { EventsService } from '@nexanode/backend-events-application';

describe('EventsController', () => {
  let controller: EventsController;

  const expectedEvents = eventsFactory();

  const expectedEvent = expectedEvents[0];

  const mockService = {
    getEvents: jest.fn().mockResolvedValue(expectedEvents),
    getEventById: jest.fn().mockResolvedValue(expectedEvent),
    createEvent: jest.fn().mockResolvedValue(expectedEvent),
    updateEvent: jest.fn().mockResolvedValue(expectedEvent),
    deleteEvent: jest.fn().mockResolvedValue(expectedEvent),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsController],
    })
      .useMocker((token) => {
        if (token === EventsService) {
          return mockService;
        }
        return;
      })
      .compile();

    controller = module.get<EventsController>(EventsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('getEvents', () => {
    it('should return an array of events', async () => {
      expect(await controller.getEvents({} as never)).toEqual(expectedEvents);
    });
  });
  describe('getEventById', () => {
    it('should return an event', async () => {
      expect(await controller.getEventById('1')).toEqual(expectedEvent);
    });
  });
  describe('createEvent', () => {
    it('should return an event', async () => {
      expect(await controller.createEvent({} as never)).toEqual(expectedEvent);
    });
  });
  describe('updateEvent', () => {
    it('should return an event', async () => {
      expect(await controller.updateEvent('1', {} as never)).toEqual(
        expectedEvent,
      );
    });
  });
  describe('deleteEvent', () => {
    it('should return an event', async () => {
      expect(await controller.deleteEvent('1')).toEqual(expectedEvent);
    });
  });
});
