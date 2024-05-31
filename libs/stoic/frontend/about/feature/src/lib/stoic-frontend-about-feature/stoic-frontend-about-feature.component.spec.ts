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
  it('should generate card config', () => {
    const person = component.people[0];
    const cardConfig = component.generateCardConfig(person);
    expect(cardConfig).toEqual(
      JSON.stringify({
        imageSrc: person.image,
        imageAlt: person.name,
        imagePosition: 'top-right',
      }),
    );
  });
});
