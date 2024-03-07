import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DateModule } from '../date/date.module';
import { DateRangeComponent } from './date-range.component';

@NgModule({
  declarations: [DateRangeComponent],
  imports: [CommonModule, ReactiveFormsModule, DateModule],
  exports: [DateRangeComponent],
})
export class DateRangeModule {}
