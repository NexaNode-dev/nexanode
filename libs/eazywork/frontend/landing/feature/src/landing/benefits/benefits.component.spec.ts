import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EazyworkBenefitsComponent } from './benefits.component';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('EazyworkBenefitsComponent', () => {
  let component: EazyworkBenefitsComponent;
  let fixture: ComponentFixture<EazyworkBenefitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EazyworkBenefitsComponent],
      providers: [provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(EazyworkBenefitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
