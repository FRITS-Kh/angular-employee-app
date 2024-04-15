import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { authGuard, unauthGuard } from '@app/guards';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule),
    canActivate: [unauthGuard],
  },
  {
    path: 'registration',
    loadChildren: () =>
      import('./pages/registration/registration.module').then(
        (m) => m.RegistrationModule
      ),
    canActivate: [unauthGuard],
  },
  {
    path: 'email-confirm',
    loadChildren: () =>
      import('./pages/email-confirm/email-confirm.module').then(
        (m) => m.EmailConfirmModule
      ),
    canActivate: [authGuard],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
