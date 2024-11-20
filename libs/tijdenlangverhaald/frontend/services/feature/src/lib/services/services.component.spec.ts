import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TijdenlangverhaaldServicesComponent } from './services.component';

describe('TijdenlangverhaaldServicesComponent', () => {
  let component: TijdenlangverhaaldServicesComponent;
  let fixture: ComponentFixture<TijdenlangverhaaldServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TijdenlangverhaaldServicesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TijdenlangverhaaldServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
