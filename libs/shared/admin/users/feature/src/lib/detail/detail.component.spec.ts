import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NexanodeAdminUsersDetailComponent } from './detail.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('NexanodeAdminUsersDetailComponent', () => {
  let component: NexanodeAdminUsersDetailComponent;
  let fixture: ComponentFixture<NexanodeAdminUsersDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NexanodeAdminUsersDetailComponent],
      providers: [provideHttpClient(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(NexanodeAdminUsersDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
