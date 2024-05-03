import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailComponent } from './detail.component';
import { ServicesStore } from '@nexanode/optimalist-frontend-services-state';
import { ViewportScroller } from '@angular/common';
import { ComponentRef } from '@angular/core';

window.scrollTo = jest.fn();

describe('DetailComponent', () => {
  let component: DetailComponent;
  let componentRef: ComponentRef<DetailComponent>;
  let fixture: ComponentFixture<DetailComponent>;

  const mockServicesStore = {
    selectedService: () => [],
    otherServices: () => [],
    getServiceById: () => [],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailComponent],
      providers: [
        { provide: ServicesStore, useValue: mockServicesStore },
        ViewportScroller,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('id', '1');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
