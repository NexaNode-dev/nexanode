import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TijdenlangFooterComponent } from './footer.component';

describe('TijdenlangFooterComponent', () => {
  let component: TijdenlangFooterComponent;
  let fixture: ComponentFixture<TijdenlangFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TijdenlangFooterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TijdenlangFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
