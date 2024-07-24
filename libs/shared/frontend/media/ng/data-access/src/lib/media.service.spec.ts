import { TestBed } from '@angular/core/testing';

import { MediaService } from './media.service';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { mediaItemsFactory } from '@nexanode/testing-data-mocks-utils';

describe('MediaService', () => {
  let service: MediaService;
  let httpController: HttpTestingController;

  const expectedMedia = mediaItemsFactory();
  const expectedMediaItem = expectedMedia[0];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MediaService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(MediaService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterAll(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('getMedia', () => {
    it('should get media', () => {
      service.getMedia().subscribe((media) => {
        expect(media).toEqual(expectedMedia);
      });
      const req = httpController.expectOne('/api/media');
      expect(req.request.method).toBe('GET');
      req.flush(expectedMedia);
    });
  });
  describe('getMediaItem', () => {
    it('should get media item', () => {
      service.getMediaItem(expectedMediaItem.id).subscribe((mediaItem) => {
        expect(mediaItem).toEqual(expectedMediaItem);
      });
      const req = httpController.expectOne(
        `/api/media/${expectedMediaItem.id}`,
      );
      expect(req.request.method).toBe('GET');
      req.flush(expectedMediaItem);
    });
  });
  describe('createMedia', () => {
    it('should create media item', () => {
      service.createMedia(expectedMediaItem).subscribe((mediaItem) => {
        expect(mediaItem).toEqual(expectedMediaItem);
      });
      const req = httpController.expectOne('/api/media');
      expect(req.request.method).toBe('POST');
      req.flush(expectedMediaItem);
    });
  });
  describe('updateMedia', () => {
    it('should update media item', () => {
      service
        .updateMedia(expectedMediaItem.id, expectedMediaItem)
        .subscribe((mediaItem) => {
          expect(mediaItem).toEqual(expectedMediaItem);
        });
      const req = httpController.expectOne(
        `/api/media/${expectedMediaItem.id}`,
      );
      expect(req.request.method).toBe('PATCH');
      req.flush(expectedMediaItem);
    });
  });
  describe('deleteMedia', () => {
    it('should delete media item', () => {
      service.deleteMedia(expectedMediaItem.id).subscribe((id) => {
        expect(id).toEqual(expectedMediaItem.id);
      });
      const req = httpController.expectOne(
        `/api/media/${expectedMediaItem.id}`,
      );
      expect(req.request.method).toBe('DELETE');
      req.flush(expectedMediaItem.id);
    });
  });
});
