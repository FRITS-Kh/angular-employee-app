import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { Dictionaries } from '@app/store/dictionaries';
import { markFormGroupTouched, regex, regexErrors } from '@app/shared/utils';
import { StepperService } from '../stepper/services';
import { RecruiterForm } from './roles/recruiter/recruiter.component';
import { EmployeeForm } from './roles/employee/employee.component';

export interface ProfessionalForm {
  about: string;
  roleId: string;
  role: EmployeeForm | RecruiterForm | null;
}

@Component({
  selector: 'app-professional',
  templateUrl: './professional.component.html',
  styleUrl: './professional.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfessionalComponent implements OnInit, OnDestroy {
  @Input() value: ProfessionalForm | null = null;
  @Input() dictionaries: Dictionaries | null = null;
  @Output() changed = new EventEmitter<ProfessionalForm>();

  form: FormGroup = this.fb.group({
    roleId: [
      null,
      {
        updateOn: 'change',
        validators: [Validators.required],
      },
    ],
    about: [null],
  });
  regexErrors = regexErrors;
  private destroy = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private stepper: StepperService
  ) {}

  ngOnInit(): void {
    if (this.value) {
      this.form.patchValue(this.value);
    }

    this.stepper.check$.pipe(takeUntil(this.destroy)).subscribe((type) => {
      if (!this.form.valid) {
        markFormGroupTouched(this.form);
        this.form.updateValueAndValidity();
        this.changeDetectorRef.detectChanges();
      } else {
        this.changed.emit(this.form.value);
      }

      this.stepper[type].next(this.form.valid);
    });
  }

  get employeeForm(): EmployeeForm | null {
    const employeeRole = this.value?.role as EmployeeForm;

    return employeeRole?.specialization ? employeeRole : null;
  }

  get recruiterForm(): RecruiterForm | null {
    const recruiterRole = this.value?.role as RecruiterForm;

    return recruiterRole?.companyName ? recruiterRole : null;
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
