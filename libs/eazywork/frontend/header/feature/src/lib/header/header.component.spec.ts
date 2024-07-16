import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EazyworkHeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: EazyworkHeaderComponent;
  let fixture: ComponentFixture<EazyworkHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EazyworkHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EazyworkHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
