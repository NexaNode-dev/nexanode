import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NexanodeAdminServicesFormComponent } from './form.component';
import { MockServicesStore } from '@nexanode/testing-store-mocks-ng-util';
import { servicesStore } from '@nexanode/frontend-services-ng-state';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('FormComponent', () => {
  let component: NexanodeAdminServicesFormComponent;
  let fixture: ComponentFixture<NexanodeAdminServicesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NexanodeAdminServicesFormComponent],
      providers: [
        { provide: servicesStore, useClass: MockServicesStore },
        provideRouter([]),
        provideAnimations(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NexanodeAdminServicesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
