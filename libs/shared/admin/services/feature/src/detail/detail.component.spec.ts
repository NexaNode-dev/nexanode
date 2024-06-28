import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NexanodeAdminServicesDetailComponent } from './detail.component';
import { MockServicesStore } from '@nexanode/testing-store-mocks-ng-util';
import { servicesStore } from '@nexanode/frontend-services-ng-state';
import { provideRouter } from '@angular/router';
import { ComponentRef } from '@angular/core';
import { IService } from '@nexanode/domain-interfaces';

describe('DetailComponent', () => {
  let component: NexanodeAdminServicesDetailComponent;
  let fixture: ComponentFixture<NexanodeAdminServicesDetailComponent>;
  let componentRef: ComponentRef<NexanodeAdminServicesDetailComponent>;
  let mockServicesStore: MockServicesStore;

  let expectedServices: IService[];
  let expectedService: IService;

  beforeEach(async () => {
    mockServicesStore = new MockServicesStore();
    expectedServices = mockServicesStore.services();
    expectedService = expectedServices[0];
    await TestBed.configureTestingModule({
      imports: [NexanodeAdminServicesDetailComponent],
      providers: [
        { provide: servicesStore, useValue: mockServicesStore },
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NexanodeAdminServicesDetailComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('id', expectedService.id);
    fixture.whenStable().then(() => {
      fixture.detectChanges();
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
