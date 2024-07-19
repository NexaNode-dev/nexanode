import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EazyworkBannerComponent } from './banner.component';

describe('EazyworkBannerComponent', () => {
  let component: EazyworkBannerComponent;
  let fixture: ComponentFixture<EazyworkBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EazyworkBannerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EazyworkBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
