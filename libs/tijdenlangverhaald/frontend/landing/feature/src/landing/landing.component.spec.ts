import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TijdenlangverhaaldLandingComponent } from './landing.component';

describe('TijdenlangverhaaldLandingComponent', () => {
  let component: TijdenlangverhaaldLandingComponent;
  let fixture: ComponentFixture<TijdenlangverhaaldLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TijdenlangverhaaldLandingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TijdenlangverhaaldLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
