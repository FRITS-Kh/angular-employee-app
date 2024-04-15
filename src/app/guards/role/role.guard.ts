import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { map, take, tap } from 'rxjs';

import * as fromRoot from '@app/store';
import * as fromUser from '@app/store/user';
import { Roles } from '@app/store/user';

type Role = Roles.Employee | Roles.Recruiter;

export { Roles } from '@app/store/user';
export interface GuardData {
  roles: Role[];
}

export const roleGuard: CanActivateFn = (route) => {
  const router = inject(Router);

  return inject(Store<fromRoot.State>).pipe(
    select(fromUser.getUser),
    take(1),
    map((user) => (user ? route.data['roles'].includes(user.roleId) : false)),
    tap((isAllowed) => {
      if (!isAllowed) {
        router.navigate(['/']);
      }
    })
  );
};
