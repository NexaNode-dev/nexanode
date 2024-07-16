import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NexaNodeAdminAuthActivateComponent } from './activate.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { ComponentRef } from '@angular/core';

describe('NexaNodeAdminAuthActivateComponent', () => {
  let component: NexaNodeAdminAuthActivateComponent;
  let fixture: ComponentFixture<NexaNodeAdminAuthActivateComponent>;
  let componentRef: ComponentRef<NexaNodeAdminAuthActivateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NexaNodeAdminAuthActivateComponent],
      providers: [provideHttpClient(), provideAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(NexaNodeAdminAuthActivateComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('id', '123');
    componentRef.setInput('token', 'abc');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
