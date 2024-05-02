import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { FormFieldComponent, InputComponent } from '@app/shared';
import { Dictionaries } from '@app/store/dictionaries';

export interface RecruiterForm {
  companyName: string;
  employeesCount: number;
}

@Component({
  selector: 'app-recruiter',
  standalone: true,
  imports: [ReactiveFormsModule, FormFieldComponent, InputComponent],
  templateUrl: './recruiter.component.html',
  styleUrl: './recruiter.component.scss',
})
export class RecruiterComponent implements OnInit, OnDestroy {
  @Input() parent!: FormGroup;
  @Input() name = '';
  @Input() value: RecruiterForm | null = null;
  @Input() dictionaries: Dictionaries | null = null;

  form: FormGroup = this.fb.group({
    companyName: [null, { updateOn: 'blur', validators: Validators.required }],
    employeesCount: [
      null,
      { updateOn: 'blur', validators: Validators.required },
    ],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    if (this.value) {
      this.form.patchValue(this.value);
    }

    this.parent.addControl(this.name, this.form);
  }

  ngOnDestroy(): void {
    this.parent.removeControl(this.name);
  }
}
