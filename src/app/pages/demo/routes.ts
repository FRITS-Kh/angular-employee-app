import { Routes } from '@angular/router';

import { DemoComponent } from './demo.component';

export const DEMO_ROUTES: Routes = [
  {
    path: '',
    component: DemoComponent,
    children: [
      {
        path: 'styles',
        loadComponent: () =>
          import('./pages/styles/styles.component').then(
            (m) => m.StylesComponent
          ),
      },
      {
        path: 'shared',
        loadComponent: () =>
          import('./pages/shared/shared.component').then(
            (m) => m.SharedComponent
          ),
      },
      {
        path: 'guards',
        loadChildren: () =>
          import('./pages/guards/routes').then((m) => m.GUARDS_ROUTES),
      },
    ],
  },
];
