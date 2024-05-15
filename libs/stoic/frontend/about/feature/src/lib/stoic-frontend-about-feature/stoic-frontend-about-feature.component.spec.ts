import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoicFrontendAboutFeatureComponent } from './stoic-frontend-about-feature.component';

describe('StoicFrontendAboutFeatureComponent', () => {
  let component: StoicFrontendAboutFeatureComponent;
  let fixture: ComponentFixture<StoicFrontendAboutFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoicFrontendAboutFeatureComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StoicFrontendAboutFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
