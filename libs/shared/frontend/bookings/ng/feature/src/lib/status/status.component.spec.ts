import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NexanodeBookingsStatusComponent } from './status.component';
import { provideHttpClient } from '@angular/common/http';
import { ComponentRef } from '@angular/core';

describe('NexanodeBookingsStatusComponent', () => {
  let component: NexanodeBookingsStatusComponent;
  let fixture: ComponentFixture<NexanodeBookingsStatusComponent>;
  let componentRef: ComponentRef<NexanodeBookingsStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NexanodeBookingsStatusComponent],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(NexanodeBookingsStatusComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('id', '1');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
