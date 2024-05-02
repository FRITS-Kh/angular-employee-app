import {
  Component,
  EventEmitter,
  Input,
  Output,
  forwardRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

import { DateComponent } from '../date/date.component';

export interface DateRangeValue {
  from: number;
  to: number;
}
export interface DateRangePlaceholder {
  from: string;
  to: string;
}

@Component({
  selector: 'app-date-range',
  standalone: true,
  imports: [ReactiveFormsModule, DateComponent],
  templateUrl: './date-range.component.html',
  styleUrl: './date-range.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateRangeComponent),
      multi: true,
    },
  ],
})
export class DateRangeComponent implements ControlValueAccessor {
  @Input() placeholder?: DateRangePlaceholder;
  @Output() changed = new EventEmitter<DateRangeValue>();

  form: FormGroup = this.fb.group({
    from: [null],
    to: [null],
  });
  private propagateChange = (value?: DateRangeValue) => {};
  private propagateTouched = () => {};

  constructor(private fb: FormBuilder) {}

  get min(): Date | null {
    const from = this.form.controls['from'].value;

    return from ? new Date(from) : null;
  }

  get max(): Date | null {
    const to = this.form.controls['to'].value;

    return to ? new Date(to) : null;
  }

  writeValue(value: DateRangeValue): void {
    this.form.patchValue(value || {});
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.propagateTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.form.disable() : this.form.enable();
  }

  onChanged(): void {
    const value = { ...this.form.value };

    this.propagateChange(value);
    this.changed.emit(value);
  }

  onClosed(): void {
    this.propagateTouched();
  }
}
