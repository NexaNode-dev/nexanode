import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NexaNodeServicesListComponent } from './list.component';
import { ComponentRef } from '@angular/core';
import { servicesFactory } from '@nexanode/testing-data-mocks-utils';
import { provideHttpClient } from '@angular/common/http';

describe('NexaNodeServicesListComponent', () => {
  let component: NexaNodeServicesListComponent;
  let fixture: ComponentFixture<NexaNodeServicesListComponent>;
  let componentRef: ComponentRef<NexaNodeServicesListComponent>;

  //const mockServices = servicesFactory();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NexaNodeServicesListComponent],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(NexaNodeServicesListComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should display the custom title', () => {
    componentRef.setInput('title', 'Offerings');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('h2').textContent).toContain(
      'Offerings',
    );
  });
});
