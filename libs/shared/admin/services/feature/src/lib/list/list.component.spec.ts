import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NexanodeAdminServicesListComponent } from './list.component';
import { servicesStore } from '@nexanode/frontend-services-ng-state';
import { MockServicesStore } from '@nexanode/testing-store-mocks-ng-util';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('NexanodeAdminServicesListComponent', () => {
  let component: NexanodeAdminServicesListComponent;
  let fixture: ComponentFixture<NexanodeAdminServicesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NexanodeAdminServicesListComponent],
      providers: [
        { provide: servicesStore, useClass: MockServicesStore },
        provideRouter([]),
        provideAnimations(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NexanodeAdminServicesListComponent);
    component = fixture.componentInstance;
    fixture.whenStable().then(() => {
      fixture.detectChanges();
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
