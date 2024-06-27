import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NexaNodeAdminAuthActivateComponent } from './activate.component';

describe('NexaNodeAdminAuthActivateComponent', () => {
  let component: NexaNodeAdminAuthActivateComponent;
  let fixture: ComponentFixture<NexaNodeAdminAuthActivateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NexaNodeAdminAuthActivateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NexaNodeAdminAuthActivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
