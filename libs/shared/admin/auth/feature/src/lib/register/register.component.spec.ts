import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NexaNodeAdminAuthRegisterComponent } from './register.component';

describe('NexaNodeAdminAuthRegisterComponent', () => {
  let component: NexaNodeAdminAuthRegisterComponent;
  let fixture: ComponentFixture<NexaNodeAdminAuthRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NexaNodeAdminAuthRegisterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NexaNodeAdminAuthRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
