import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanMatch,
  GuardResult,
  MaybeAsync,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, filter, map, take, tap } from 'rxjs';

import * as fromRoot from '@app/store';
import * as fromUser from '@app/store/user';

@Injectable({
  providedIn: 'root',
})
export class UnauthGuard implements CanActivate, CanActivateChild, CanMatch {
  constructor(private router: Router, private store: Store<fromRoot.State>) {}

  private check(): Observable<boolean> {
    return this.store.pipe(
      select(fromUser.getUserState),
      filter((state) => !state.loading),
      take(1),
      tap((state) => {
        if (Boolean(state.uid)) {
          this.router.navigate(['/']);
        }
      }),
      map((state) => !state.uid)
    );
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<GuardResult> {
    return this.check();
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<GuardResult> {
    return this.check();
  }
  canMatch(route: Route, segments: UrlSegment[]): MaybeAsync<GuardResult> {
    return this.check();
  }
}
