import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivateComponent } from './activate.component';
import { ComponentRef } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

describe('ActivateComponent', () => {
  let component: ActivateComponent;
  let fixture: ComponentFixture<ActivateComponent>;
  let componentRef: ComponentRef<ActivateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivateComponent],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(ActivateComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('id', 'id');
    componentRef.setInput('token', 'token');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
