import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import {
  ButtonComponent,
  DateRangeComponent,
  FormFieldComponent,
  InputComponent,
} from '@app/shared';

export interface ExperienceForm {
  companyName: string;
  period: Period;
}

interface Period {
  from: number;
  to: number;
}

@Component({
  selector: 'app-experiences',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormFieldComponent,
    InputComponent,
    DateRangeComponent,
    ButtonComponent,
  ],
  templateUrl: './experiences.component.html',
  styleUrl: './experiences.component.scss',
})
export class ExperiencesComponent implements OnInit, OnDestroy {
  @Input() parent!: FormGroup;
  @Input() name = '';
  @Input() values: ExperienceForm[] = [];

  form!: FormArray;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.init();
  }

  private init(): void {
    this.form = this.fb.array(this.getFormGroupArray(this.values));
    this.parent.addControl(this.name, this.form);
  }

  private getFormGroupArray(values: ExperienceForm[]): FormGroup[] {
    if (!this.values.length) {
      return [this.getFormGroup()];
    }

    return values.map((value) => this.getFormGroup(value));
  }

  private getFormGroup(value?: ExperienceForm): FormGroup {
    const group: FormGroup = this.fb.group({
      companyName: [
        null,
        {
          updateOn: 'blur',
          validators: [Validators.required],
        },
      ],
      period: [
        null,
        {
          updateOn: 'change',
          validators: [Validators.required],
        },
      ],
    });

    if (value) {
      group.patchValue(value);
    }

    return group;
  }

  addExperience(): void {
    this.form.push(this.getFormGroup());
  }

  deleteExperience(i: number): void {
    this.form.removeAt(i);
  }

  get experienceControls(): FormGroup[] {
    const experienceForm = this.parent.controls[this.name];

    if (experienceForm instanceof FormArray) {
      return experienceForm.controls as FormGroup[];
    }

    return [];
  }

  ngOnDestroy(): void {
    this.parent.removeControl(this.name);
  }
}
