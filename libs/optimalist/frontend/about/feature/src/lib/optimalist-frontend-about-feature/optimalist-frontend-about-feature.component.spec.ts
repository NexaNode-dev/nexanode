import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OptimalistFrontendAboutFeatureComponent } from './optimalist-frontend-about-feature.component';

describe('OptimalistFrontendAboutFeatureComponent', () => {
  let component: OptimalistFrontendAboutFeatureComponent;
  let fixture: ComponentFixture<OptimalistFrontendAboutFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptimalistFrontendAboutFeatureComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OptimalistFrontendAboutFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title', () => {
    const title = fixture.nativeElement.querySelector('.text-4xl');
    expect(title.textContent).toContain('About Johan Vrolix');
  });
});
