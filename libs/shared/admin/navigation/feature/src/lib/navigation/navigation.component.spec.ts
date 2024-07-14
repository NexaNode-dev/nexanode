import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NexanodeAdminNavigationComponent } from './navigation.component';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { ComponentRef } from '@angular/core';

describe('NexanodeAdminNavigationComponent', () => {
  let component: NexanodeAdminNavigationComponent;
  let fixture: ComponentFixture<NexanodeAdminNavigationComponent>;
  let componentRef: ComponentRef<NexanodeAdminNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NexanodeAdminNavigationComponent],
      providers: [provideHttpClient(), provideAnimations(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(NexanodeAdminNavigationComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('title', 'Test title');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
