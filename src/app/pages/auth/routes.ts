import { Routes } from '@angular/router';

import { authGuard, unauthGuard } from '@app/guards';

export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/routes').then((m) => m.LOGIN_ROUTES),
    canActivate: [unauthGuard],
  },
  {
    path: 'registration',
    loadChildren: () =>
      import('./pages/registration/routes').then((m) => m.REGISTRATION_ROUTES),
    canActivate: [unauthGuard],
  },
  {
    path: 'email-confirm',
    loadChildren: () =>
      import('./pages/email-confirm/routes').then(
        (m) => m.EMAIL_CONFIRM_ROUTES
      ),
    canActivate: [authGuard],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'login',
  },
];
