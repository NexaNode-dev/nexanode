import { Test, TestingModule } from '@nestjs/testing';
import { MediaRepository } from './media.repository';
import { mediaItemsFactory } from '@nexanode/testing-data-mocks-utils';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Media } from './media.entity';
import { NotFoundException } from '@nestjs/common';

describe('MediaRepository', () => {
  let provider: MediaRepository;

  const expectedMedia = mediaItemsFactory();

  const expectedMediaItem = expectedMedia[0];

  const mockRepository = {
    find: jest.fn().mockResolvedValue(expectedMedia),
    findOne: jest.fn().mockResolvedValue(expectedMediaItem),
    create: jest.fn().mockReturnValue(expectedMediaItem),
    save: jest.fn().mockResolvedValue(expectedMediaItem),
    preload: jest.fn().mockResolvedValue(expectedMediaItem),
    remove: jest.fn().mockResolvedValue(expectedMediaItem),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MediaRepository],
    })
      .useMocker((token) => {
        if (token === getRepositoryToken(Media)) {
          return mockRepository;
        }
        return;
      })
      .compile();

    provider = module.get<MediaRepository>(MediaRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
  describe('getMedia', () => {
    it('should return an array of media items', async () => {
      expect(await provider.getMedia()).toEqual(expectedMedia);
    });
  });
  describe('getMediaItem', () => {
    it('should return a single media item', async () => {
      expect(await provider.getMediaItem({})).toEqual(expectedMediaItem);
    });
    it('should throw a NotFoundException if no media item is found', async () => {
      mockRepository.findOne.mockResolvedValueOnce(null);
      try {
        await provider.getMediaItem({});
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
  describe('createMedia', () => {
    it('should create a new media item', async () => {
      expect(await provider.createMedia({})).toEqual(expectedMediaItem);
    });
  });
  describe('updateMedia', () => {
    it('should update a media item', async () => {
      expect(await provider.updateMedia('', {})).toEqual(expectedMediaItem);
    });
    it('should throw a NotFoundException if no media item is found', async () => {
      mockRepository.preload.mockResolvedValueOnce(null);
      try {
        await provider.updateMedia('', {});
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
  describe('deleteMedia', () => {
    it('should delete a media item', async () => {
      expect(await provider.deleteMedia(expectedMediaItem.id)).toEqual(
        expectedMediaItem.id,
      );
    });
    it('should throw a NotFoundException if no media item is found', async () => {
      mockRepository.findOne.mockResolvedValueOnce(null);
      try {
        await provider.deleteMedia('');
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
