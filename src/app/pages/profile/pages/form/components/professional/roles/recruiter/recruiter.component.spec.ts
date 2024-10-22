import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterComponent } from './recruiter.component';
import { FormGroup } from '@angular/forms';

describe('RecruiterComponent', () => {
  let component: RecruiterComponent;
  let fixture: ComponentFixture<RecruiterComponent>;
  let parentForm: FormGroup;

  beforeEach(async () => {
    parentForm = new FormGroup({});
    await TestBed.configureTestingModule({}).compileComponents();

    fixture = TestBed.createComponent(RecruiterComponent);
    component = fixture.componentInstance;
    component.parent = parentForm;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
