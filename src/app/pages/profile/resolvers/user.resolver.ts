import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, filter, take } from 'rxjs';

import * as fromRoot from '@app/store';
import * as fromUser from '@app/store/user';

export const userResolver: ResolveFn<
  fromUser.User | null
> = (): Observable<fromUser.User | null> =>
  inject(Store<fromRoot.State>).pipe(
    select(fromUser.getUser),
    filter((user) => Boolean(user)),
    take(1)
  );
