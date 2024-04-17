import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuardsRoutingModule } from './guards-routing.module';
import { GuardsComponent } from './guards.component';
import { AuthComponent } from './components/auth/auth.component';
import { UnauthComponent } from './components/unauth/unauth.component';
import { RoleComponent } from './components/role/role.component';
import { VerifiedComponent } from './components/verified/verified.component';

@NgModule({
  declarations: [
    GuardsComponent,
    AuthComponent,
    UnauthComponent,
    RoleComponent,
    VerifiedComponent,
  ],
  imports: [CommonModule, GuardsRoutingModule],
})
export class GuardsModule {}
