import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { provideRouter } from '@angular/router';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have 4 links', () => {
    const links = fixture.nativeElement.querySelectorAll('a');
    expect(links.length).toBe(4);
  });
  it('should have a title of "Tijdenlang Verhaald"', () => {
    const title = fixture.nativeElement.querySelector('h1');
    expect(title.textContent).toBe('Tijdenlang Verhaald');
  });
});
