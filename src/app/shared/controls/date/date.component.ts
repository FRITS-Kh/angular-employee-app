import {
  Component,
  EventEmitter,
  Input,
  Output,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  MatDatepickerInputEvent,
  MatDatepickerModule,
} from '@angular/material/datepicker';

export type DateValue = number | null;

@Component({
  selector: 'app-date',
  standalone: true,
  imports: [MatDatepickerModule],
  templateUrl: './date.component.html',
  styleUrl: './date.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateComponent),
      multi: true,
    },
  ],
})
export class DateComponent implements ControlValueAccessor {
  @Input() placeholder? = '';
  @Input() min?: Date | null;
  @Input() max?: Date | null;
  @Output() changed = new EventEmitter<DateValue>();
  @Output() closed = new EventEmitter<void>();

  value: DateValue = null;
  isDisabled = false;
  private propagateChange = (value?: DateValue) => {};
  private propagateTouched = () => {};

  get inputValue(): Date | null {
    return this.value ? new Date(this.value) : null;
  }

  writeValue(value: DateValue): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.propagateTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onChanged(event: MatDatepickerInputEvent<Date>): void {
    const value = event.value ? event.value.getTime() : null;

    this.value = value;
    this.propagateChange(value);
    this.changed.emit(value);
  }

  onClosed(): void {
    this.propagateTouched();
    this.closed.emit();
  }
}
