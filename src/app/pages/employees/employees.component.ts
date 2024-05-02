import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { SpinnerComponent } from '@app/shared';
import * as fromRoot from '@app/store';
import * as fromList from './store/list';
import { User } from './store/list/list.models';
import { EmployeeComponent } from './components';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule, EmployeeComponent, SpinnerComponent],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesComponent implements OnInit {
  employees$: Observable<User[]> = this.store.pipe(select(fromList.getItems));
  loading$: Observable<boolean> = this.store.pipe(select(fromList.getLoading));

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit(): void {
    this.store.dispatch(new fromList.Read());
  }
}
