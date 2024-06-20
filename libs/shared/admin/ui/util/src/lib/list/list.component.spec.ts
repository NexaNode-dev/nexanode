import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NexaNodeAmdinUiListComponent } from './list.component';
import { IUser } from '@nexanode/domain-interfaces';
import { usersFactory } from '@nexanode/testing-data-mocks-utils';
import { provideRouter } from '@angular/router';
import { ComponentRef } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';

const mockUsers: IUser[] = usersFactory();

const mockColumns = Object.keys(mockUsers[0]);

describe('ListComponent', () => {
  let component: NexaNodeAmdinUiListComponent<IUser>;
  let fixture: ComponentFixture<NexaNodeAmdinUiListComponent<IUser>>;
  let componentRef: ComponentRef<NexaNodeAmdinUiListComponent<IUser>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NexaNodeAmdinUiListComponent],
      providers: [provideRouter([]), provideAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(NexaNodeAmdinUiListComponent<IUser>);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('data', mockUsers);
    componentRef.setInput('type', 'users');
    componentRef.setInput('columns', mockColumns);
    fixture.whenStable().then(() => {
      fixture.detectChanges();
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have data', () => {
    expect(component.data()).toEqual(mockUsers);
  });
  it('should have type', () => {
    expect(component.type()).toEqual('users');
  });
  it('should have columns', () => {
    expect(component.columns()).toEqual(mockColumns);
  });
  it('should have paginator', () => {
    expect(component.paginator).toBeTruthy();
  });
  it('should have sort', () => {
    expect(component.sort).toBeTruthy();
  });
  it('should have table', () => {
    expect(component.table).toBeTruthy();
  });
  it('should have dataSource', () => {
    expect(component.dataSource).toBeTruthy();
  });
});
