import { importProvidersFrom } from '@angular/core';
import { Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { effects, reducers } from './store';
import { userResolver } from './resolvers';

const profileProviders = [
  importProvidersFrom(
    StoreModule.forFeature('profile', reducers),
    EffectsModule.forFeature(effects)
  ),
];

export const PROFILE_ROUTES: Routes = [
  {
    path: 'new',
    loadChildren: () =>
      import('./pages/form/routes').then((m) => m.FORM_ROUTES),
    providers: [...profileProviders],
  },
  {
    path: 'edit',
    loadChildren: () =>
      import('./pages/form/routes').then((m) => m.FORM_ROUTES),
    providers: [...profileProviders],
    resolve: {
      user: userResolver,
    },
  },
  {
    path: ':id',
    loadChildren: () =>
      import('./pages/display/routes').then((m) => m.DISPLAY_ROUTES),
    providers: [...profileProviders],
  },
];
