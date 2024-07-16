import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NexanodeAdminServicesCategoriesDetailComponent } from './categories-detail.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { servicesStore } from '@nexanode/frontend-services-ng-state';
import { MockServicesStore } from '@nexanode/testing-store-mocks-ng-util';
import { ComponentRef } from '@angular/core';

describe('NexanodeAdminServicesCategoriesDetailComponent', () => {
  let component: NexanodeAdminServicesCategoriesDetailComponent;
  let fixture: ComponentFixture<NexanodeAdminServicesCategoriesDetailComponent>;
  let componentRef: ComponentRef<NexanodeAdminServicesCategoriesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NexanodeAdminServicesCategoriesDetailComponent],
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
      NexanodeAdminServicesCategoriesDetailComponent,
    );
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('id', '1');
    fixture.whenStable().then(() => {
      fixture.detectChanges();
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
