import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { EventsService } from './events.service';
import { eventsFactory } from '@nexanode/testing-data-mocks-utils';

describe('EventsService', () => {
  let service: EventsService;
  let httpController: HttpTestingController;

  const expectedEvents = eventsFactory();
  const expectedEvent = expectedEvents[0];

  const apiUrl = '/api/events';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(EventsService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterAll(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('getEvents', () => {
    it('should return expected events', () => {
      service.getEvents().subscribe((events) => {
        expect(events).toEqual(expectedEvents);
      });

      const req = httpController.expectOne(apiUrl);
      expect(req.request.method).toEqual('GET');
      req.flush(expectedEvents);
    });
  });
  describe('getEvent', () => {
    it('should return expected event', () => {
      service.getEvent(expectedEvent.id).subscribe((event) => {
        expect(event).toEqual(expectedEvent);
      });

      const req = httpController.expectOne(`${apiUrl}/${expectedEvent.id}`);
      expect(req.request.method).toEqual('GET');
      req.flush(expectedEvent);
    });
  });
  describe('createEvent', () => {
    it('should create event', () => {
      service.createEvent(expectedEvent).subscribe((event) => {
        expect(event).toEqual(expectedEvent);
      });

      const req = httpController.expectOne(apiUrl);
      expect(req.request.method).toEqual('POST');
      req.flush(expectedEvent);
    });
  });
  describe('updateEvent', () => {
    it('should update event', () => {
      service.updateEvent(expectedEvent).subscribe((event) => {
        expect(event).toEqual(expectedEvent);
      });

      const req = httpController.expectOne(`${apiUrl}/${expectedEvent.id}`);
      expect(req.request.method).toEqual('PATCH');
      req.flush(expectedEvent);
    });
  });
  describe('deleteEvent', () => {
    it('should delete event', () => {
      service.deleteEvent(expectedEvent.id).subscribe((result) => {
        expect(result).toEqual(expectedEvent.id);
      });

      const req = httpController.expectOne(`${apiUrl}/${expectedEvent.id}`);
      expect(req.request.method).toEqual('DELETE');
      req.flush(expectedEvent.id);
    });
  });
});
