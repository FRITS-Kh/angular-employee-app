import { Injectable } from '@angular/core';
import { Firestore, docData, doc } from '@angular/fire/firestore';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, catchError, map, of, switchMap, take } from 'rxjs';

import * as fromActions from './user.actions';
import { User } from './user.models';

type Action = fromActions.All;

@Injectable()
export class UserEffects {
  constructor(private actions: Actions, private firestore: Firestore) {}

  read: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.Types.READ),
      switchMap((action: fromActions.Read) =>
        (
          docData(doc(this.firestore, `users/${action.id}`)) as Observable<User>
        ).pipe(
          take(1),
          map((user) => new fromActions.ReadSuccess(user || null)),
          catchError((err) => of(new fromActions.ReadError(err.message)))
        )
      )
    )
  );
}
