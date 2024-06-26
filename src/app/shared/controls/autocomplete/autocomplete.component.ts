import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  forwardRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {
  Observable,
  Subject,
  distinctUntilChanged,
  filter,
  map,
  startWith,
  takeUntil,
} from 'rxjs';

import { ControlItem, Value } from '@app/models/frontend';
import { HighlightPipe } from './pipes/highlight.pipe';
export { ControlItem, Value } from '@app/models/frontend';

@Component({
  selector: 'app-autocomplete',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    HighlightPipe,
  ],
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteComponent),
      multi: true,
    },
  ],
})
export class AutocompleteComponent
  implements OnInit, OnDestroy, ControlValueAccessor
{
  @Input() items: ControlItem[] = [];
  @Input() placeholder? = '';
  @Output() changed = new EventEmitter<Value>();

  formControl = new FormControl();
  options$!: Observable<ControlItem[]>;
  private destroy = new Subject<void>();
  private propagateChange = (value?: Value) => {};
  private propagateTouched = () => {};

  ngOnInit(): void {
    this.options$ = this.formControl.valueChanges.pipe(
      startWith(''),
      filter((value) => typeof value === 'string' || typeof value === 'object'),
      map((value) => (typeof value === 'string' ? value : value.label)),
      map((label) => (label ? this.filter(label) : this.items.slice()))
    );

    this.formControl.valueChanges
      .pipe(takeUntil(this.destroy), distinctUntilChanged())
      .subscribe((item) => {
        const value = typeof item === 'object' ? item.value : null;

        this.propagateChange(value);
        this.changed.emit(value);
      });
  }

  private filter(value: string): ControlItem[] {
    const filterValue = value.toLowerCase();

    return this.items.filter((item) =>
      item.label.toLowerCase().includes(filterValue)
    );
  }

  writeValue(value: Value): void {
    const selectedOption = this.items.find((item) => item.value === value);

    this.formControl.setValue(selectedOption);
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.propagateTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.formControl.disable() : this.formControl.enable();
  }

  displayFn(item?: ControlItem): string {
    return item?.label ?? '';
  }

  onBlur(): void {
    this.propagateTouched();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
