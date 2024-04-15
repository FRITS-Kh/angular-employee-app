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
import { Observable, map, take, tap } from 'rxjs';

import * as fromRoot from '@app/store';
import * as fromUser from '@app/store/user';
import { Roles } from '@app/store/user';

type Role = Roles.Employee | Roles.Recruiter;

export { Roles } from '@app/store/user';
export interface GuardData {
  roles: Role[];
}

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate, CanActivateChild, CanMatch {
  constructor(private router: Router, private store: Store<fromRoot.State>) {}

  private check(allowedRoles: string[]): Observable<boolean> {
    return this.store.pipe(
      select(fromUser.getUser),
      take(1),
      map((user) => (user ? allowedRoles.includes(user.roleId) : false)),
      tap((isAllowed) => {
        if (!isAllowed) {
          this.router.navigate(['/']);
        }
      })
    );
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<GuardResult> {
    return this.check(route.data['roles']);
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<GuardResult> {
    return this.check(childRoute.data['roles']);
  }
  canMatch(route: Route, segments: UrlSegment[]): MaybeAsync<GuardResult> {
    return route.data ? this.check(route.data['roles']) : false;
  }
}
