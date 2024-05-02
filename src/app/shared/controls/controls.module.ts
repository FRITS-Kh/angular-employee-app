import { NgModule } from '@angular/core';

import {
  InputComponent,
  FormFieldComponent,
  PasswordComponent,
  SelectComponent,
  CheckboxesComponent,
  RadiosComponent,
  DateComponent,
  DateRangeComponent,
  AutocompleteComponent,
} from './';

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
