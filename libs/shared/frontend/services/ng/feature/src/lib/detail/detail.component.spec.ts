import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NexaNodeServicesDetailComponent } from './detail.component';
import { provideHttpClient } from '@angular/common/http';
import { ComponentRef } from '@angular/core';

describe('DetailComponent', () => {
  let component: NexaNodeServicesDetailComponent;
  let fixture: ComponentFixture<NexaNodeServicesDetailComponent>;
  let componentRef: ComponentRef<NexaNodeServicesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NexaNodeServicesDetailComponent],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(NexaNodeServicesDetailComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('id', '1');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
