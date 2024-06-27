import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NexaNodeAdminAuthLoginComponent } from './login.component';

describe('NexaNodeAdminAuthLoginComponent', () => {
  let component: NexaNodeAdminAuthLoginComponent;
  let fixture: ComponentFixture<NexaNodeAdminAuthLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NexaNodeAdminAuthLoginComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NexaNodeAdminAuthLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
