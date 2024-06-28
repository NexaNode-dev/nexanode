import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NexaNodeAdminAuthForgotComponent } from './forgot.component';

describe('ForgotComponent', () => {
  let component: NexaNodeAdminAuthForgotComponent;
  let fixture: ComponentFixture<NexaNodeAdminAuthForgotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NexaNodeAdminAuthForgotComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NexaNodeAdminAuthForgotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
