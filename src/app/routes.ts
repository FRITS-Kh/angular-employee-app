import { Routes } from '@angular/router';

import { Roles, roleGuard, verifiedGuard } from './guards';

export const APP_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: 'auth',
        loadChildren: () =>
          import('./pages/auth/routes').then((m) => m.AUTH_ROUTES),
      },
      {
        path: 'demo',
        loadChildren: () =>
          import('./pages/demo/routes').then((m) => m.DEMO_ROUTES),
      },
      {
        path: 'static',
        loadChildren: () =>
          import('./pages/static/routes').then((m) => m.STATIC_ROUTES),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./pages/profile/routes').then((m) => m.PROFILE_ROUTES),
        canActivate: [verifiedGuard],
      },
      {
        path: 'employees',
        loadChildren: () =>
          import('./pages/employees/routes').then((m) => m.EMPLOYEES_ROUTES),
        canActivate: [verifiedGuard, roleGuard],
        data: { roles: [Roles.Recruiter] },
      },
      {
        path: 'jobs',
        loadChildren: () =>
          import('./pages/jobs/routes').then((m) => m.JOBS_ROUTES),
        canActivate: [verifiedGuard],
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'static/welcome',
      },
    ],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/static/404',
  },
];
