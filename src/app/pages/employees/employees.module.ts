import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { UserPhotoModule } from '@app/shared/layout';
import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesComponent } from './employees.component';
import { effects, reducers } from './store';
import { EmployeeComponent } from './components/employee/employee.component';

@NgModule({
  declarations: [EmployeesComponent, EmployeeComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature('employees', reducers),
    EffectsModule.forFeature(effects),
    EmployeesRoutingModule,
    UserPhotoModule,
  ],
})
export class EmployeesModule {}
