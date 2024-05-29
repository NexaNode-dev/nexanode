import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormComponent } from './form.component';
import { provideHttpClient } from '@angular/common/http';
import { By } from '@angular/platform-browser';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormComponent],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have a form', () => {
    const form = fixture.elementRef.nativeElement.querySelector('form');
    expect(form).toBeTruthy();
    const nameInput = fixture.elementRef.nativeElement.querySelector('input[id="name"]');
    expect(nameInput).toBeTruthy();
    const typeIdInput = fixture.elementRef.nativeElement.querySelector('select[id="type"]');
    expect(typeIdInput).toBeTruthy();
    const descriptionInput = fixture.elementRef.nativeElement.querySelector('textarea[id="description"]');
    expect(descriptionInput).toBeTruthy();
    const registrationNumberInput = fixture.elementRef.nativeElement.querySelector('input[id="registrationNumber"]');
    expect(registrationNumberInput).toBeTruthy();
    const submitButton = fixture.elementRef.nativeElement.querySelector('button[type="submit"]');
    expect(submitButton).toBeTruthy();
  });
  it('should validate the form', () => {
    const nameInput = fixture.debugElement.query(By.css('input[id="name"]'));
    nameInput.nativeElement.focus();
    nameInput.nativeElement.blur();
    expect(component.name?.touched && component.name?.hasError('required')).toBeTruthy();
    const typeIdInput = fixture.debugElement.query(By.css('select[id="type"]'));
    typeIdInput.nativeElement.focus();
    typeIdInput.nativeElement.blur();
    expect(component.typeId?.touched && component.typeId?.hasError('required')).toBeTruthy();
    const registrationNumberInput = fixture.debugElement.query(By.css('input[id="registrationNumber"]'));
    registrationNumberInput.nativeElement.focus();
    registrationNumberInput.nativeElement.blur();
    expect(component.registrationNumber?.touched && component.registrationNumber?.hasError('required')).toBeTruthy();
  });
});
