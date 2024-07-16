import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NexanodeAdminEventsListComponent } from './list.component';

describe('NexanodeAdminEventsListComponent', () => {
  let component: NexanodeAdminEventsListComponent;
  let fixture: ComponentFixture<NexanodeAdminEventsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NexanodeAdminEventsListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NexanodeAdminEventsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
