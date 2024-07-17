import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NexanodeAdminEventsDetailComponent } from './detail.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { ComponentRef } from '@angular/core';

describe('NexanodeAdminEventsDetailComponent', () => {
  let component: NexanodeAdminEventsDetailComponent;
  let fixture: ComponentFixture<NexanodeAdminEventsDetailComponent>;
  let componentRef: ComponentRef<NexanodeAdminEventsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NexanodeAdminEventsDetailComponent],
      providers: [provideHttpClient(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(NexanodeAdminEventsDetailComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('id', '1');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
