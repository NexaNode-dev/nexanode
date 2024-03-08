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
});
