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

export interface PersonalForm {
  name: string;
  photoUrl: string;
  country: string;
}

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrl: './personal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalComponent implements OnInit, OnDestroy {
  @Input() value: PersonalForm | null = null;
  @Input() dictionaries: Dictionaries | null = null;
  @Output() changed = new EventEmitter<PersonalForm>();

  form: FormGroup = this.fb.group({
    photoUrl: [null],
    name: [
      null,
      {
        updateOn: 'blur',
        validators: [
          Validators.required,
          Validators.maxLength(128),
          Validators.pattern(regex.latinAndSpaces),
        ],
      },
    ],
    country: [
      null,
      {
        updateOn: 'change',
        validators: [Validators.required],
      },
    ],
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

  onPhotoChanged(url: string | string[]): void {
    if (url) {
      this.form.controls['photoUrl'].setValue(url);
    }
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
