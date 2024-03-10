import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OptimalistFrontendLandingFeatureComponent } from './optimalist-frontend-landing-feature.component';

describe('OptimalistFrontendLandingFeatureComponent', () => {
  let component: OptimalistFrontendLandingFeatureComponent;
  let fixture: ComponentFixture<OptimalistFrontendLandingFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptimalistFrontendLandingFeatureComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      OptimalistFrontendLandingFeatureComponent,
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // Add more tests according to the logic of optimalist-frontend-landing-feature.component.ts and optimalist-frontend-landing-feature.component.html

  it('should render the services', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Our Services');
  });
});
