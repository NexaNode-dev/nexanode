import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NexanodeAdminEventsListComponent } from './list.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('NexanodeAdminEventsListComponent', () => {
  let component: NexanodeAdminEventsListComponent;
  let fixture: ComponentFixture<NexanodeAdminEventsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NexanodeAdminEventsListComponent],
      providers: [provideHttpClient(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(NexanodeAdminEventsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
