import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NexanodeAdminJobOffersFormComponent } from './form.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('NexanodeAdminJobOffersFormComponent', () => {
  let component: NexanodeAdminJobOffersFormComponent;
  let fixture: ComponentFixture<NexanodeAdminJobOffersFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NexanodeAdminJobOffersFormComponent],
      providers: [provideHttpClient(), provideRouter([]), provideAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(NexanodeAdminJobOffersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
