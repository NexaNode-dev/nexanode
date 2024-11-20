import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TijdenlangverhaaldAboutComponent } from './about.component';

describe('TijdenlangverhaaldAboutComponent', () => {
  let component: TijdenlangverhaaldAboutComponent;
  let fixture: ComponentFixture<TijdenlangverhaaldAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TijdenlangverhaaldAboutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TijdenlangverhaaldAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
