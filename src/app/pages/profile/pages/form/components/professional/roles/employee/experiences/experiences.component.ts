import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface ExperianceForm {
  companyName: string;
  period: Period;
}

interface Period {
  from: number;
  to: number;
}

@Component({
  selector: 'app-experiences',
  templateUrl: './experiences.component.html',
  styleUrl: './experiences.component.scss',
})
export class ExperiencesComponent implements OnInit, OnDestroy {
  @Input() parent!: FormGroup;
  @Input() name = '';
  @Input() values: ExperianceForm[] = [];

  form!: FormArray;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.init();
  }

  private init(): void {
    this.form = this.fb.array(this.getFormGroupArray(this.values));
    this.parent.addControl(this.name, this.form);
  }

  private getFormGroupArray(values: ExperianceForm[]): FormGroup[] {
    if (!this.values.length) {
      return [this.getFormGroup()];
    }

    return values.map((value) => this.getFormGroup(value));
  }

  private getFormGroup(value?: ExperianceForm): FormGroup {
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
