import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { FormComponent } from './form.component';
import { MapperService } from './services';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let router: Router;
  let mockStore: MockStore;
  let mockMapperService: Partial<MapperService>;

  beforeEach(async () => {
    mockMapperService = {
      userToForm: jest.fn(),
      formToUserCreate: jest.fn(),
      formToUserUpdate: jest.fn(),
    };
    await TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        provideMockStore({}),
        { provide: MapperService, useValue: mockMapperService },
      ],
    }).compileComponents();

    mockStore = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
