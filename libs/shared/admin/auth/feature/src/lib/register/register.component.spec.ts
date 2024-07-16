import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NexaNodeAdminAuthRegisterComponent } from './register.component';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('NexaNodeAdminAuthRegisterComponent', () => {
  let component: NexaNodeAdminAuthRegisterComponent;
  let fixture: ComponentFixture<NexaNodeAdminAuthRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NexaNodeAdminAuthRegisterComponent],
      providers: [provideAnimations(), provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(NexaNodeAdminAuthRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
