import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss',
})
export class FormFieldComponent {
  @Input() label = '';
  @Input() required? = false;
  @Input() isInline? = true;
  @Input() control?: AbstractControl;
  @Input() patternError?: string;

  hasError(): boolean | undefined {
    return this.control && this.control.invalid && this.control.touched;
  }

  get errorKey() {
    return (
      this.control && this.control.errors && Object.keys(this.control.errors)[0]
    );
  }
}
