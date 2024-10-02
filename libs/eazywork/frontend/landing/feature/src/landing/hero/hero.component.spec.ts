import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EazyWorkHeroComponent } from './hero.component';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('EazyWorkHeroComponent', () => {
  let component: EazyWorkHeroComponent;
  let fixture: ComponentFixture<EazyWorkHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EazyWorkHeroComponent],
      providers: [provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(EazyWorkHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
