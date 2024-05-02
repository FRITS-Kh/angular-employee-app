import {
  Component,
  EventEmitter,
  Input,
  Output,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export enum PasswordType {
  Password = 'password',
  Text = 'text',
}

@Component({
  selector: 'app-password',
  standalone: true,
  templateUrl: './password.component.html',
  styleUrl: './password.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordComponent),
      multi: true,
    },
  ],
})
export class PasswordComponent implements ControlValueAccessor {
  @Input() placeholder? = '';
  @Output() changed = new EventEmitter<string>();

  value = '';
  isDisabled = false;
  passwordType = PasswordType.Password;
  toggleButtonText = 'Show';
  private propagateChange = (value?: string) => {};
  private propagateTouched = () => {};

  writeValue(value: string): void {
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

  onKeyup(target: EventTarget | null): void {
    const value = target ? (target as HTMLInputElement).value : '';

    this.value = value;
    this.propagateChange(value);
    this.changed.emit(value);
  }

  onBlur(): void {
    this.propagateTouched();
  }

  togglePassword(): void {
    this.passwordType =
      this.passwordType === PasswordType.Password
        ? PasswordType.Text
        : PasswordType.Password;
    this.toggleButtonText =
      this.passwordType === PasswordType.Password ? 'Show' : 'Hide';
  }
}
