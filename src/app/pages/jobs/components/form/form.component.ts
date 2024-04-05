import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { markFormGroupTouched, regex, regexErrors } from '@app/shared/utils';
import * as fromRoot from '@app/store';
import * as fromList from '../../store/list';
import { Job } from '../../store/list';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent implements OnInit {
  form: FormGroup = this.fb.group({
    title: [
      null,
      {
        updateOn: 'blur',
        validators: [
          Validators.required,
          Validators.maxLength(128),
          Validators.pattern(regex.safe),
        ],
      },
    ],
    salary: [
      null,
      {
        updateOn: 'blur',
        validators: [Validators.required, Validators.pattern(regex.numbers)],
      },
    ],
  });

  title = 'Add a new job';
  regexErrors = regexErrors;

  constructor(
    private fb: FormBuilder,
    private store: Store<fromRoot.State>,
    private dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { value: Job; isEdit: boolean }
  ) {}

  ngOnInit(): void {
    if (this.data.value) {
      this.form.patchValue(this.data.value);
    }

    if (this.data.isEdit) {
      this.title = 'Edit job';
    }
  }

  onSubmit(): void {
    if (!this.form.valid) {
      markFormGroupTouched(this.form);

      return;
    }

    if (this.data.value) {
      this.store.dispatch(
        new fromList.Update({ ...this.data.value, ...this.form.value })
      );
    } else {
      this.store.dispatch(new fromList.Create(this.form.value));
    }

    this.dialogRef.close();
  }
}
