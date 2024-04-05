import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, map } from 'rxjs';

import * as fromRoot from '@app/store';
import * as fromUser from '@app/store/user';
import * as fromProfileUser from '../../store/user';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrl: './display.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisplayComponent implements OnInit, OnDestroy {
  user$: Observable<fromProfileUser.User | null> = this.store.pipe(
    select(fromProfileUser.getUser)
  );
  loading$: Observable<boolean> = this.store.pipe(
    select(fromProfileUser.getLoading)
  );
  isOwnProfile$!: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];

      this.store.dispatch(new fromProfileUser.Read(id));
      this.isOwnProfile$ = this.store.pipe(
        select(fromUser.getUser),
        map((user) => (user ? user.uid === id : false))
      );
    });
  }

  getEmployeeRole(
    role: fromProfileUser.User['role']
  ): fromProfileUser.Employee | null {
    const employeeRole = role as fromProfileUser.Employee;

    return employeeRole?.specialization ? employeeRole : null;
  }

  getRecruiterRole(
    role: fromProfileUser.User['role']
  ): fromProfileUser.Recruiter | null {
    const recruiterRole = role as fromProfileUser.Recruiter;

    return recruiterRole?.companyName ? recruiterRole : null;
  }

  ngOnDestroy(): void {
    this.store.dispatch(new fromProfileUser.Clear());
  }
}
