import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionChanges,
  query,
  where,
} from '@angular/fire/firestore';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, catchError, map, of, switchMap, take } from 'rxjs';

import { extractDocumentChangeActionData } from '@app/shared/utils';
import * as fromActions from './list.actions';
import { User } from './list.models';

type Action = fromActions.All;

@Injectable()
export class ListEffects {
  constructor(private actions: Actions, private firestore: Firestore) {}

  read: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.Types.READ),
      switchMap(() =>
        collectionChanges(
          query(
            collection(this.firestore, 'users'),
            where('roleId', '==', 'employee')
          )
        ).pipe(
          take(1),
          map((data) =>
            data.map((user) =>
              extractDocumentChangeActionData<User>(user, false)
            )
          ),
          map((items) => new fromActions.ReadSuccess(items)),
          catchError((err) => of(new fromActions.ReadError(err.message)))
        )
      )
    )
  );
}
