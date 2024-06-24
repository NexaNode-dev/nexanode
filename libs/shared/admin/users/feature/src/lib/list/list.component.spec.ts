import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NexanodeAdminUsersListComponent } from './list.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

describe('NexanodeAdminUsersListComponent', () => {
  let component: NexanodeAdminUsersListComponent;
  let fixture: ComponentFixture<NexanodeAdminUsersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NexanodeAdminUsersListComponent],
      providers: [provideHttpClient(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(NexanodeAdminUsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
