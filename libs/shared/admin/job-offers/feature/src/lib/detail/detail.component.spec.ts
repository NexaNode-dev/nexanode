import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NexanodeAdminJobOffersDetailComponent } from './detail.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { ComponentRef } from '@angular/core';

describe('NexanodeAdminJobOffersDetailComponent', () => {
  let component: NexanodeAdminJobOffersDetailComponent;
  let fixture: ComponentFixture<NexanodeAdminJobOffersDetailComponent>;
  let componentRef: ComponentRef<NexanodeAdminJobOffersDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NexanodeAdminJobOffersDetailComponent],
      providers: [provideHttpClient(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(NexanodeAdminJobOffersDetailComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('id', '1');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
