import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ServicesStore } from '@nexanode/optimalist-frontend-services-state';

describe('AppComponent', () => {
  const mockServicesStore = {
    services: () => [],
    getServices: () => [],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, RouterTestingModule],
      providers: [{ provide: ServicesStore, useValue: mockServicesStore }],
    }).compileComponents();
  });

  it(`should have as title 'Optimalist Consulting'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Optimalist Consulting');
  });
});
