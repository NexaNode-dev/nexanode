import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NexanodeAdminNavigationComponent } from './navigation.component';

describe('NexanodeAdminNavigationComponent', () => {
  let component: NexanodeAdminNavigationComponent;
  let fixture: ComponentFixture<NexanodeAdminNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NexanodeAdminNavigationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NexanodeAdminNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
