import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NexanodeJobOffersListComponent } from './list.component';
import { provideHttpClient } from '@angular/common/http';

describe('ListComponent', () => {
  let component: NexanodeJobOffersListComponent;
  let fixture: ComponentFixture<NexanodeJobOffersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NexanodeJobOffersListComponent],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(NexanodeJobOffersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
