import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NexanodeAdminEventsFormComponent } from './form.component';

describe('NexanodeAdminEventsFormComponent', () => {
  let component: NexanodeAdminEventsFormComponent;
  let fixture: ComponentFixture<NexanodeAdminEventsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NexanodeAdminEventsFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NexanodeAdminEventsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
