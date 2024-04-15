import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DemoComponent } from './demo.component';

const routes: Routes = [
  {
    path: '',
    component: DemoComponent,
    children: [
      {
        path: 'styles',
        loadChildren: () =>
          import('./pages/styles/styles.module').then((m) => m.StylesModule),
      },
      {
        path: 'shared',
        loadChildren: () =>
          import('./pages/shared/shared.module').then((m) => m.SharedModule),
      },
      {
        path: 'guards',
        loadChildren: () =>
          import('./pages/guards/guards.module').then((m) => m.GuardsModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DemoRoutingModule {}
