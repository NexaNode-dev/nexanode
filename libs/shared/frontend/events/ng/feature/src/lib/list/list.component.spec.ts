import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NexanodeEventsListComponent } from './list.component';
import { provideHttpClient } from '@angular/common/http';

describe('NexanodeEventsListComponent', () => {
  let component: NexanodeEventsListComponent;
  let fixture: ComponentFixture<NexanodeEventsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NexanodeEventsListComponent],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(NexanodeEventsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
