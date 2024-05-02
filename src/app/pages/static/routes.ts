import { Routes } from '@angular/router';

export const STATIC_ROUTES: Routes = [
  {
    path: 'welcome',
    loadChildren: () =>
      import('./pages/welcome/routes').then((m) => m.WELCOME_ROUTES),
  },
  {
    path: '404',
    loadChildren: () =>
      import('./pages/not-found/routes').then((m) => m.NOT_FOUND_ROUTES),
  },
];
