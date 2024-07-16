import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NexanodeAdminEventsDetailComponent } from './detail.component';

describe('NexanodeAdminEventsDetailComponent', () => {
  let component: NexanodeAdminEventsDetailComponent;
  let fixture: ComponentFixture<NexanodeAdminEventsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NexanodeAdminEventsDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NexanodeAdminEventsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
