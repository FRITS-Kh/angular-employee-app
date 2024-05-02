import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { Observable, map } from 'rxjs';

import { ButtonComponent } from '@app/shared';
import * as fromRoot from '@app/store';
import * as fromUser from '@app/store/user';
import * as fromList from './store/list';
import { Job } from './store/list/list.models';
import { FormComponent, JobComponent } from './components';

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [CommonModule, JobComponent, ButtonComponent],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobsComponent implements OnInit {
  jobs$: Observable<Job[]> = this.store.pipe(select(fromList.selectAll));
  isEditable$: Observable<boolean> = this.store.pipe(
    select(fromUser.getRoleId),
    map((roleId) => (roleId ? ['recruiter'].includes(roleId) : false))
  );

  constructor(public dialog: MatDialog, private store: Store<fromRoot.State>) {}

  ngOnInit(): void {
    this.store.dispatch(new fromList.Read());
  }

  onAdd(): void {
    this.dialog.open(FormComponent, {
      width: '650px',
      data: {},
    });
  }

  onEdit(value: Job): void {
    this.dialog.open(FormComponent, {
      width: '650px',
      data: { value, isEdit: true },
    });
  }

  onDelete(id: string): void {
    this.store.dispatch(new fromList.Delete(id));
  }
}
