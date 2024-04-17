import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, filter, take } from 'rxjs';

import * as fromRoot from './store';
import * as fromDictionaries from './store/dictionaries';
import * as fromUser from './store/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'course-app';
  isAuthorized$: Observable<boolean> = this.store.pipe(
    select(fromUser.getIsAuthorized)
  );
  isVerified$: Observable<boolean> = this.store.pipe(
    select(fromUser.getIsEmailVerified)
  );
  user$: Observable<fromUser.User | null> = this.store.pipe(
    select(fromUser.getUser)
  );

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.store.dispatch(new fromUser.Init());
    this.store
      .pipe(select(fromUser.getUserState))
      .pipe(
        filter((state) => Boolean(state.uid)),
        take(1)
      )
      .subscribe(() => {
        this.store.dispatch(new fromDictionaries.Read());
      });
  }

  onSignOut(): void {
    this.store.dispatch(new fromUser.SignOut());
  }
}
