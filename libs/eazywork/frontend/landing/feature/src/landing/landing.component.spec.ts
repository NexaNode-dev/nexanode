import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EazyWorkLandingComponent } from './landing.component';

describe('EazyWorkLandingComponent', () => {
  let component: EazyWorkLandingComponent;
  let fixture: ComponentFixture<EazyWorkLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EazyWorkLandingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EazyWorkLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
