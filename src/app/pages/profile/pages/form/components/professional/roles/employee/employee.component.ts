import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { regex, regexErrors } from '@app/shared/utils/regex';
import { ControlEntities, mapControls } from '@app/shared/utils/form';
import { Dictionaries } from '@app/store/dictionaries';

import { ExperianceForm } from './experiences/experiences.component';

export interface EmployeeForm {
  specialization: string;
  skills: string[];
  qualification: string;
  expectedSalary: number;
  experiences: ExperianceForm[];
}

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
})
export class EmployeeComponent implements OnInit, OnDestroy {
  @Input() parent!: FormGroup;
  @Input() name = '';
  @Input() value: EmployeeForm | null = null;
  @Input() dictionaries: Dictionaries | null = null;

  form: FormGroup = this.fb.group({
    expectedSalary: [
      null,
      {
        updateOn: 'blur',
        validators: [Validators.required, Validators.pattern(regex.numbers)],
      },
    ],
    specialization: [
      null,
      { updateOn: 'change', validators: Validators.required },
    ],
    qualification: [
      { value: null, disabled: true },
      { updateOn: 'change', validators: Validators.required },
    ],
    skills: [
      { value: null, disabled: true },
      { updateOn: 'change', validators: Validators.required },
    ],
  });
  regexErrors = regexErrors;
  controls!: ControlEntities;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.controls = {
      specialization: {
        items: this.dictionaries?.specializations.controlItems,
        changed: () => {
          if (this.controls['qualification'].map) {
            this.controls['qualification'].map();
          }

          if (this.controls['skills'].map) {
            this.controls['skills'].map();
          }
        },
      },
      qualification: {
        items: this.dictionaries?.qualifications.controlItems,
        map: () => {
          if (!this.form.value.specialization) {
            this.form.controls['qualification'].reset();
            this.form.controls['qualification'].disable();

            return;
          }

          this.form.controls['qualification'].enable();
        },
      },
      skills: {
        items: this.dictionaries?.skills.controlItems,
        map: () => {
          if (!this.form.value.specialization) {
            this.form.controls['skills'].reset();
            this.form.controls['skills'].disable();

            return;
          }

          this.form.controls['skills'].enable();
          const items = this.dictionaries
            ? [...this.dictionaries.skills.controlItems].map((item, index) => ({
                ...item,
                label: `${item.label} (${index + 1})`,
              }))
            : [];

          this.controls['skills'].items = items;
        },
      },
    };

    if (this.value) {
      this.form.patchValue(this.value);
    }

    mapControls(this.controls);
    this.parent.addControl(this.name, this.form);
  }

  ngOnDestroy(): void {
    this.parent.removeControl(this.name);
  }
}
