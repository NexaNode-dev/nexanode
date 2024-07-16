import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NexaNodeAdminAuthResetComponent } from './reset.component';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('NexaNodeAdminAuthResetComponent', () => {
  let component: NexaNodeAdminAuthResetComponent;
  let fixture: ComponentFixture<NexaNodeAdminAuthResetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NexaNodeAdminAuthResetComponent],
      providers: [provideHttpClient(), provideAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(NexaNodeAdminAuthResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
