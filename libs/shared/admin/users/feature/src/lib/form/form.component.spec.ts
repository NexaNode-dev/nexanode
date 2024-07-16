import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NexanodeAdminUsersFormComponent } from './form.component';
import { ComponentRef } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('NexanodeAdminUsers', () => {
  let component: NexanodeAdminUsersFormComponent;
  let fixture: ComponentFixture<NexanodeAdminUsersFormComponent>;
  let componentRef: ComponentRef<NexanodeAdminUsersFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NexanodeAdminUsersFormComponent],
      providers: [provideHttpClient(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(NexanodeAdminUsersFormComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have a userForm', () => {
    expect(component.userForm).toBeTruthy();
  });
});
