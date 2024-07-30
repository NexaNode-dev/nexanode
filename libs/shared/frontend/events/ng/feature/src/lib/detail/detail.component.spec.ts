import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NexanodeEventsDetailComponent } from './detail.component';
import { provideHttpClient } from '@angular/common/http';
import { ComponentRef } from '@angular/core';

describe('NexanodeEventsDetailComponent', () => {
  let component: NexanodeEventsDetailComponent;
  let fixture: ComponentFixture<NexanodeEventsDetailComponent>;
  let componentRef: ComponentRef<NexanodeEventsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NexanodeEventsDetailComponent],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(NexanodeEventsDetailComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('id', '1');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
