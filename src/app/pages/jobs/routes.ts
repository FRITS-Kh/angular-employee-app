import { importProvidersFrom } from '@angular/core';
import { Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { effects, reducers } from './store';
import { JobsComponent } from './jobs.component';

export const JOBS_ROUTES: Routes = [
  {
    path: '',
    component: JobsComponent,
    providers: [
      importProvidersFrom(
        StoreModule.forFeature('jobs', reducers),
        EffectsModule.forFeature(effects)
      ),
    ],
  },
];
