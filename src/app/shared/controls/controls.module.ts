import { NgModule } from '@angular/core';

import { InputComponent } from './input/input.component';
import { FormFieldComponent } from './form-field/form-field.component';
import { PasswordComponent } from './password/password.component';
import { SelectComponent } from './select/select.component';
import { CheckboxesComponent } from './checkboxes/checkboxes.component';
import { RadiosComponent } from './radios/radios.component';
import { DateComponent } from './date/date.component';
import { DateRangeComponent } from './date-range/date-range.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';

@NgModule({
  imports: [
    InputComponent,
    FormFieldComponent,
    PasswordComponent,
    SelectComponent,
    CheckboxesComponent,
    RadiosComponent,
    DateComponent,
    DateRangeComponent,
    AutocompleteComponent,
  ],
  exports: [
    InputComponent,
    FormFieldComponent,
    PasswordComponent,
    SelectComponent,
    CheckboxesComponent,
    RadiosComponent,
    DateComponent,
    DateRangeComponent,
    AutocompleteComponent,
  ],
})
export class ControlsModule {}
