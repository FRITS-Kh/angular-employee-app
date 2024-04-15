import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { authGuard, roleGuard, Roles, unauthGuard } from '@app/guards';

import { GuardsComponent } from './guards.component';
import { AuthComponent } from './components/auth/auth.component';
import { UnauthComponent } from './components/unauth/unauth.component';
import { RoleComponent } from './components/role/role.component';

const routes: Routes = [
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
        path: 'role',
        component: RoleComponent,
        canActivate: [authGuard, roleGuard],
        data: { roles: [Roles.Employee] },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuardsRoutingModule {}
