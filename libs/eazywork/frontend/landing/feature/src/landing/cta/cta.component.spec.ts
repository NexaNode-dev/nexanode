import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EazyworkCtaComponent } from './cta.component';

describe('CtaComponent', () => {
  let component: EazyworkCtaComponent;
  let fixture: ComponentFixture<EazyworkCtaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EazyworkCtaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EazyworkCtaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
