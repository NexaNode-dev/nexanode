import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NexanodeJobOffersDetailComponent } from './detail.component';
import { provideHttpClient } from '@angular/common/http';
import { ComponentRef } from '@angular/core';

describe('NexanodeJobOffersDetailComponent', () => {
  let component: NexanodeJobOffersDetailComponent;
  let fixture: ComponentFixture<NexanodeJobOffersDetailComponent>;
  let componentRef: ComponentRef<NexanodeJobOffersDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NexanodeJobOffersDetailComponent],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(NexanodeJobOffersDetailComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('id', '1');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
