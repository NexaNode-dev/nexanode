import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NexanodeAdminEventsFormComponent } from './form.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('NexanodeAdminEventsFormComponent', () => {
  let component: NexanodeAdminEventsFormComponent;
  let fixture: ComponentFixture<NexanodeAdminEventsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NexanodeAdminEventsFormComponent],
      providers: [provideHttpClient(), provideRouter([]), provideAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(NexanodeAdminEventsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
