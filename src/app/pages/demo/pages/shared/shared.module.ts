import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import {
  ButtonsModule,
  ControlsModule,
  IndicatorsModule,
  PopupsModule,
} from '@app/shared';
import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';

@NgModule({
  declarations: [SharedComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedRoutingModule,
    ButtonsModule,
    ControlsModule,
    IndicatorsModule,
    PopupsModule,
  ],
})
export class SharedModule {}
