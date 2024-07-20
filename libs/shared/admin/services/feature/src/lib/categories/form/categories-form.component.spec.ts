import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NexanodeAdminServicesCategoriesFormComponent } from './categories-form.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { servicesStore } from '@nexanode/frontend-services-ng-state';
import { MockServicesStore } from '@nexanode/testing-store-mocks-ng-util';

describe('NexanodeAdminServicesCategoriesFormComponent', () => {
  let component: NexanodeAdminServicesCategoriesFormComponent;
  let fixture: ComponentFixture<NexanodeAdminServicesCategoriesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NexanodeAdminServicesCategoriesFormComponent],
      providers: [
        {
          provide: servicesStore,
          useClass: MockServicesStore,
        },
        provideRouter([]),
        provideAnimations(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(
      NexanodeAdminServicesCategoriesFormComponent,
    );
    component = fixture.componentInstance;
    fixture.whenStable().then(() => {
      fixture.detectChanges();
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
