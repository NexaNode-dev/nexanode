import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NexaNodeAdminAuthForgotComponent } from './forgot.component';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('ForgotComponent', () => {
  let component: NexaNodeAdminAuthForgotComponent;
  let fixture: ComponentFixture<NexaNodeAdminAuthForgotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NexaNodeAdminAuthForgotComponent],
      providers: [provideHttpClient(), provideAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(NexaNodeAdminAuthForgotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
