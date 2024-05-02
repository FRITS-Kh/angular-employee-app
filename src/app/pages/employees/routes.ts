import { importProvidersFrom } from '@angular/core';
import { Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { effects, reducers } from './store';
import { EmployeesComponent } from './employees.component';

export const EMPLOYEES_ROUTES: Routes = [
  {
    path: '',
    component: EmployeesComponent,
    providers: [
      importProvidersFrom(
        StoreModule.forFeature('employees', reducers),
        EffectsModule.forFeature(effects)
      ),
    ],
  },
];
