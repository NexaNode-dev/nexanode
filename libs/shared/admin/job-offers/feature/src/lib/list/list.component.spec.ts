import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NexanodeAdminJobOffersListComponent } from './list.component';
import { provideHttpClient } from '@angular/common/http';

describe('NexanodeAdminJobOffersListComponent', () => {
  let component: NexanodeAdminJobOffersListComponent;
  let fixture: ComponentFixture<NexanodeAdminJobOffersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NexanodeAdminJobOffersListComponent],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(NexanodeAdminJobOffersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
