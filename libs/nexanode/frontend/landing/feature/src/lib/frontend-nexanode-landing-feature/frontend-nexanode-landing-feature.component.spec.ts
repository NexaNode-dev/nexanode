import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FrontendNexanodeLandingFeatureComponent } from './frontend-nexanode-landing-feature.component';

describe('FrontendNexanodeLandingFeatureComponent', () => {
  let component: FrontendNexanodeLandingFeatureComponent;
  let fixture: ComponentFixture<FrontendNexanodeLandingFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrontendNexanodeLandingFeatureComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FrontendNexanodeLandingFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should display the correct headline', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Welcome to NexaNode',
    );
  });

  it('CTA button should trigger the expected action', () => {
    // Adjusted for Jest. Mocking component method.
    const onCtaClickSpy = jest.spyOn(component, 'onCtaClick');
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    expect(onCtaClickSpy).toHaveBeenCalled();
  });
});
