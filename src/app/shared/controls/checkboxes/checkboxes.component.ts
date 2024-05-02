import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { ControlItem, Value } from '@app/models/frontend';
export { ControlItem, Value } from '@app/models/frontend';

@Component({
  selector: 'app-checkboxes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkboxes.component.html',
  styleUrl: './checkboxes.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxesComponent),
      multi: true,
    },
  ],
})
export class CheckboxesComponent implements ControlValueAccessor {
  @Input() items: ControlItem[] = [];
  @Output() changed = new EventEmitter<Value[]>();

  value: Value[] = [];
  isDisabled = false;
  private propagateChange = (value?: Value[]) => {};

  writeValue(value: Value[]): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {}

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onChanged(value: Value, target: EventTarget | null): void {
    const checked = target ? (target as HTMLInputElement).checked : false;
    const selected = this.getSelected(value, checked);

    this.value = selected;
    this.propagateChange(selected);
    this.changed.emit(selected);
  }

  private getSelected(value: Value, checked: boolean): Value[] {
    const selected: Value[] = this.value ? [...this.value] : [];

    if (checked && !selected.includes(value)) {
      selected.push(value);
    }

    if (!checked) {
      const index = selected.indexOf(value);
      selected.splice(index, 1);
    }

    return selected;
  }

  isChecked(value: Value): boolean {
    return this.value && this.value.includes(value);
  }
}
