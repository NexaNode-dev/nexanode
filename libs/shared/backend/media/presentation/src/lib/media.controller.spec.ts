import { Test, TestingModule } from '@nestjs/testing';
import { MediaController } from './media.controller';
import { mediaItemsFactory } from '@nexanode/testing-data-mocks-utils';
import { IMediaStorageType } from '@nexanode/domain-interfaces';
import { MediaService } from '@nexanode/backend-media-application';

describe('MediaController', () => {
  let controller: MediaController;

  const expectedMedia = mediaItemsFactory();
  const expectedMediaItem = expectedMedia[0];

  const mockService = {
    getMedia: jest.fn().mockResolvedValue(expectedMedia),
    getMediaById: jest.fn().mockResolvedValue(expectedMediaItem),
    createMedia: jest.fn().mockResolvedValue(expectedMediaItem),
    updateMedia: jest.fn().mockResolvedValue(expectedMediaItem),
    deleteMedia: jest.fn().mockResolvedValue(expectedMediaItem.id),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MediaController],
    })
      .useMocker((token) => {
        if (token === MediaService) {
          return mockService;
        }
        return;
      })
      .compile();

    controller = module.get<MediaController>(MediaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('findAll', () => {
    it('should return an array of media items', async () => {
      expect(await controller.findAll({})).toEqual(expectedMedia);
    });
  });
  describe('findOne', () => {
    it('should return a single media item', async () => {
      expect(await controller.findOne(expectedMediaItem.id)).toEqual(
        expectedMediaItem,
      );
    });
  });
  describe('create', () => {
    it('should create a new media item', async () => {
      expect(
        await controller.create(
          { name: 'test', storageType: IMediaStorageType.LOCAL, userId: '1' },
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
        ),
      ).toEqual(expectedMediaItem);
    });
  });
  describe('update', () => {
    it('should update a media item', async () => {
      expect(
        await controller.update(expectedMediaItem.id, { name: 'test' }),
      ).toEqual(expectedMediaItem);
    });
  });
  describe('remove', () => {
    it('should delete a media item', async () => {
      expect(await controller.remove(expectedMediaItem.id)).toEqual(
        expectedMediaItem.id,
      );
    });
  });
});
