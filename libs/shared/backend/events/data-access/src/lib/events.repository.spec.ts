import { Test, TestingModule } from '@nestjs/testing';
import { EventsRepository } from './events.repository';
import { eventsFactory } from '@nexanode/testing-data-mocks-utils';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

describe('EventsRepository', () => {
  let provider: EventsRepository;

  const expectedEvents = eventsFactory();

  const expectedEvent = expectedEvents[0];

  const mockRepository = {
    find: jest.fn().mockResolvedValue(expectedEvents),
    findOne: jest.fn().mockResolvedValue(expectedEvent),
    create: jest.fn().mockReturnValue(expectedEvent),
    save: jest.fn().mockResolvedValue(expectedEvent),
    preload: jest.fn().mockResolvedValue(expectedEvent),
    remove: jest.fn().mockResolvedValue(expectedEvent),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventsRepository],
    })
      .useMocker((token) => {
        if (token === getRepositoryToken(Event)) {
          return mockRepository;
        }
        return;
      })
      .compile();

    provider = module.get<EventsRepository>(EventsRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
  describe('getEvents', () => {
    it('should return all events', async () => {
      expect(await provider.getEvents()).toEqual(expectedEvents);
    });
  });
  describe('getEvent', () => {
    it('should return an event', async () => {
      expect(await provider.getEvent({})).toEqual(expectedEvent);
    });
    it('should throw a NotFoundException if the event is not found', async () => {
      mockRepository.findOne.mockResolvedValueOnce(undefined);
      try {
        await provider.getEvent({});
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
  describe('createEvent', () => {
    it('should create an event', async () => {
      expect(await provider.createEvent({})).toEqual(expectedEvent);
    });
  });
  describe('updateEvent', () => {
    it('should update an event', async () => {
      expect(await provider.updateEvent('id', {})).toEqual(expectedEvent);
    });
    it('should throw a NotFoundException if the event is not found', async () => {
      mockRepository.preload.mockResolvedValueOnce(undefined);
      try {
        await provider.updateEvent('id', {});
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
  describe('deleteEvent', () => {
    it('should delete an event', async () => {
      expect(await provider.deleteEvent('id')).toEqual('id');
    });
    it('should throw a NotFoundException if the event is not found', async () => {
      mockRepository.findOne.mockResolvedValueOnce(undefined);
      try {
        await provider.deleteEvent('id');
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
