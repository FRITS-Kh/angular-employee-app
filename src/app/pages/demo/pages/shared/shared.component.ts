import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { ControlItem } from '@app/models/frontend';
import { NotificationService } from '@app/services';
import {
  ButtonComponent,
  ControlsModule,
  SpinnerComponent,
  FilesUploadDirective,
} from '@app/shared';
import { markFormGroupTouched, regex, regexErrors } from '@app/shared/utils';

@Component({
  selector: 'app-shared',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonComponent,
    ControlsModule,
    SpinnerComponent,
    FilesUploadDirective,
  ],
  templateUrl: './shared.component.html',
  styleUrl: './shared.component.scss',
})
export class SharedComponent {
  isInline = true;
  regexErrors = regexErrors;
  items: ControlItem[] = [
    { label: 'First', value: 1 },
    { label: 'Second', value: 2 },
    { label: 'Third', value: 3 },
    { label: 'Fourth', value: 4 },
    { label: 'Fifth', value: 5 },
  ];
  form: FormGroup = this.fb.group({
    input: [
      null,
      {
        updateOn: 'blur',
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(regex.phone),
        ],
      },
    ],
    password: [
      null,
      {
        updateOn: 'blur',
        validators: [Validators.required],
      },
    ],
    autocomplete: [
      null,
      {
        updateOn: 'change',
        validators: [Validators.required],
      },
    ],
    select: [
      null,
      {
        updateOn: 'change',
        validators: [Validators.required],
      },
    ],
    checkboxes: [
      null,
      {
        updateOn: 'change',
        validators: [Validators.required],
      },
    ],
    radios: [
      null,
      {
        updateOn: 'change',
        validators: [Validators.required],
      },
    ],
    date: [
      null,
      {
        updateOn: 'change',
        validators: [Validators.required],
      },
    ],
    dateRange: [
      null,
      {
        updateOn: 'change',
        validators: [Validators.required],
      },
    ],
  });
  isSpinnerShown = false;

  constructor(
    private fb: FormBuilder,
    private notification: NotificationService
  ) {}

  onSubmit(): void {
    console.log('Submit!');

    if (!this.form.valid) {
      markFormGroupTouched(this.form);
    }
  }

  onPatchValue(): void {
    const currentTime = new Date().getTime();

    this.form.patchValue({
      input: 123,
      password: 'qwerty',
      autocomplete: 1,
      select: 2,
      checkboxes: [3, 5],
      radios: 4,
      date: currentTime,
      dateRange: {
        from: currentTime,
        to: currentTime + 172800000,
      },
    });
  }

  onToggleInline(): void {
    this.isInline = !this.isInline;
  }

  onToggleDisable(): void {
    this.form.enabled ? this.form.disable() : this.form.enable();
  }

  onToggleSpinner(): void {
    this.isSpinnerShown = !this.isSpinnerShown;
  }

  onSuccess(): void {
    this.notification.success('Everything is fine!');
  }

  onError(): void {
    this.notification.error('Oops! Something is wrong');
  }

  onFilesChanged(urls: string | string[]): void {
    if (urls) {
      console.log('urls = ', urls);
    }
  }
}
