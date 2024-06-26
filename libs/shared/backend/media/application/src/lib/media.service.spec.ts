import { Test, TestingModule } from '@nestjs/testing';
import { MediaService } from './media.service';
import { mediaItemsFactory } from '@nexanode/testing-data-mocks-utils';
import { MediaRepository } from '@nexanode/backend-media-data-access';
import * as fs from 'fs/promises';

describe('MediaService', () => {
  let service: MediaService;

  const media = mediaItemsFactory();
  const mediaItem = media[0];

  const mockRepository = {
    getMedia: jest.fn().mockResolvedValue(media),
    getMediaItem: jest.fn().mockResolvedValue(mediaItem),
    getMediaById: jest.fn().mockResolvedValue(mediaItem),
    createMedia: jest.fn().mockResolvedValue(mediaItem),
    updateMedia: jest.fn().mockResolvedValue(mediaItem),
    deleteMedia: jest.fn().mockResolvedValue(mediaItem.id),
  };

  jest.spyOn(fs, 'unlink').mockResolvedValue();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MediaService],
    })
      .useMocker((token) => {
        if (token === MediaRepository) {
          return mockRepository;
        }
        return;
      })
      .compile();

    service = module.get<MediaService>(MediaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('getMedia', () => {
    it('should return an array of media items', async () => {
      const result = await service.getMedia();
      expect(result).toEqual(media);
    });
  });
  describe('getMediaItem', () => {
    it('should return a single media item', async () => {
      const result = await service.getMediaItem();
      expect(result).toEqual(mediaItem);
    });
  });
  describe('getMediaById', () => {
    it('should return a single media item', async () => {
      const result = await service.getMediaById(mediaItem.id);
      expect(result).toEqual(mediaItem);
    });
  });
  describe('createMedia', () => {
    it('should return a single media item', async () => {
      const result = await service.createMedia(
        {},
        {
          filename: 'test.jpg',
          mimetype: 'image/jpeg',
          size: 100,
          fieldname: '',
          originalname: '',
          encoding: '',
          destination: '',
          path: '',
          buffer: undefined as unknown as Buffer,
        },
      );
      expect(result).toEqual(mediaItem);
    });
  });
  describe('updateMedia', () => {
    it('should return a single media item', async () => {
      const result = await service.updateMedia(mediaItem.id, {});
      expect(result).toEqual(mediaItem);
    });
  });
  describe('deleteMedia', () => {
    it('should return the id of the deleted media item', async () => {
      const result = await service.deleteMedia(mediaItem.id);
      expect(result).toEqual(mediaItem.id);
    });
  });
});
