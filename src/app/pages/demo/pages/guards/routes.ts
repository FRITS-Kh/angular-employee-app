import { Routes } from '@angular/router';

import {
  Roles,
  authGuard,
  roleGuard,
  unauthGuard,
  verifiedGuard,
} from '@app/guards';
import { GuardsComponent } from './guards.component';
import {
  AuthComponent,
  RoleComponent,
  UnauthComponent,
  VerifiedComponent,
} from './components';

export const GUARDS_ROUTES: Routes = [
  {
    path: '',
    component: GuardsComponent,
    children: [
      {
        path: 'auth',
        component: AuthComponent,
        canActivate: [authGuard],
      },
      {
        path: 'unauth',
        component: UnauthComponent,
        canActivate: [unauthGuard],
      },
      {
        path: 'verified',
        component: VerifiedComponent,
        canActivate: [verifiedGuard],
      },
      {
        path: 'role',
        component: RoleComponent,
        canActivate: [authGuard, roleGuard],
        data: { roles: [Roles.Employee] },
      },
    ],
  },
];
