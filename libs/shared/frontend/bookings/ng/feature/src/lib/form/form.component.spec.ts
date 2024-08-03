import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NexanodeBookingsFormComponent } from './form.component';
import { provideHttpClient } from '@angular/common/http';
import { eventFactory } from '@nexanode/testing-data-mocks-utils';
import { ComponentRef } from '@angular/core';

describe('NexanodeBookingsFormComponent', () => {
  let component: NexanodeBookingsFormComponent;
  let fixture: ComponentFixture<NexanodeBookingsFormComponent>;
  let componentRef: ComponentRef<NexanodeBookingsFormComponent>;

  const event = eventFactory();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NexanodeBookingsFormComponent],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(NexanodeBookingsFormComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('event', event);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
