import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng-mocks';
import { OptimalistFrontendLandingFeatureComponent } from './optimalist-frontend-landing-feature.component';
import { ListComponent } from '@nexanode/optimalist-frontend-services-feature';

describe('OptimalistFrontendLandingFeatureComponent', () => {
  let component: OptimalistFrontendLandingFeatureComponent;
  let fixture: ComponentFixture<OptimalistFrontendLandingFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptimalistFrontendLandingFeatureComponent, MockComponent(ListComponent)],
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
  
  it('should render the services', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('a').textContent).toContain('Our Services');
  });
});
