import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NexanodeAdminServicesCategoriesListComponent } from './categories-list.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { servicesStore } from '@nexanode/frontend-services-ng-state';
import { MockServicesStore } from '@nexanode/testing-store-mocks-ng-util';

describe('NexanodeAdminServicesCategoriesListComponent', () => {
  let component: NexanodeAdminServicesCategoriesListComponent;
  let fixture: ComponentFixture<NexanodeAdminServicesCategoriesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NexanodeAdminServicesCategoriesListComponent],
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
      NexanodeAdminServicesCategoriesListComponent,
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
