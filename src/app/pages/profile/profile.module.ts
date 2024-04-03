import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { effects, reducers } from './store';
import { ProfileRoutingModule } from './profile-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('profile', reducers),
    EffectsModule.forFeature(effects),
    ProfileRoutingModule,
  ],
})
export class ProfileModule {}
