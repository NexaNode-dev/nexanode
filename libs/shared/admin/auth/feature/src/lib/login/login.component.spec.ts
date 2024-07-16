import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NexaNodeAdminAuthLoginComponent } from './login.component';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('NexaNodeAdminAuthLoginComponent', () => {
  let component: NexaNodeAdminAuthLoginComponent;
  let fixture: ComponentFixture<NexaNodeAdminAuthLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NexaNodeAdminAuthLoginComponent],
      providers: [provideAnimations(), provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(NexaNodeAdminAuthLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
