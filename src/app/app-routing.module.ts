import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { authGuard, roleGuard, Roles } from './guards';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'auth',
        loadChildren: () =>
          import('./pages/auth/auth.module').then((m) => m.AuthModule),
      },
      {
        path: 'demo',
        loadChildren: () =>
          import('./pages/demo/demo.module').then((m) => m.DemoModule),
      },
      {
        path: 'static',
        loadChildren: () =>
          import('./pages/static/static.module').then((m) => m.StaticModule),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./pages/profile/profile.module').then((m) => m.ProfileModule),
        canActivate: [authGuard],
      },
      {
        path: 'employees',
        loadChildren: () =>
          import('./pages/employees/employees.module').then(
            (m) => m.EmployeesModule
          ),
        // canActivate: [authGuard, roleGuard], //ToDo: uncomment after dev
        // data: { roles: [Roles.Recruiter] },
      },
      {
        path: 'jobs',
        loadChildren: () =>
          import('./pages/jobs/jobs.module').then((m) => m.JobsModule),
        canActivate: [authGuard],
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

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
