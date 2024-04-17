import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { filter, map, take, tap } from 'rxjs';

import * as fromRoot from '@app/store';
import * as fromUser from '@app/store/user';

export const verifiedGuard: CanActivateFn = () => {
  const router = inject(Router);

  return inject(Store<fromRoot.State>).pipe(
    select(fromUser.getUserState),
    filter((state) => !state.loading),
    take(1),
    tap((state) => {
      if (Boolean(state.uid) && !state.isEmailVerified) {
        router.navigate(['auth/email-confirm']);
      }
    }),
    map((state) => Boolean(state.uid) && state.isEmailVerified)
  );
};
