import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NexanodeAdminServicesListComponent } from './list.component';
import { provideHttpClient } from '@angular/common/http';

describe('NexanodeAdminServicesListComponent', () => {
  let component: NexanodeAdminServicesListComponent;
  let fixture: ComponentFixture<NexanodeAdminServicesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NexanodeAdminServicesListComponent],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(NexanodeAdminServicesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
