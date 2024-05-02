import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  deleteDoc,
  doc,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  collectionChanges,
} from '@angular/fire/firestore';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, catchError, from, map, of, switchMap, take } from 'rxjs';

import { extractDocumentChangeActionData } from '@app/shared';
import { Job, JobCreateRequest } from './list.models';
import * as fromActions from './list.actions';

type Action = fromActions.All;

@Injectable()
export class ListEffects {
  constructor(private actions: Actions, private firestore: Firestore) {}

  read: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.Types.READ),
      switchMap(() =>
        collectionChanges(
          query(collection(this.firestore, 'jobs'), orderBy('created'))
        ).pipe(
          take(1),
          map((changes) =>
            changes.map((item) => extractDocumentChangeActionData<Job>(item))
          ),
          map((items: Job[]) => new fromActions.ReadSuccess(items)),
          catchError((err) => of(new fromActions.ReadError(err.message)))
        )
      )
    )
  );

  create: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.Types.CREATE),
      map((action: fromActions.Create) => action.job),
      map((job: JobCreateRequest) => ({
        ...job,
        created: serverTimestamp(),
        id: doc(collection(this.firestore, 'jobs')).id,
      })),
      switchMap((job: Job) =>
        from(setDoc(doc(this.firestore, `jobs/${job.id}`), job)).pipe(
          map(() => new fromActions.CreateSuccess(job)),
          catchError((err) => of(new fromActions.CreateError(err.message)))
        )
      )
    )
  );

  update: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.Types.UPDATE),
      map((action: fromActions.Update) => action.job),
      map((job) => ({ ...job, updated: serverTimestamp() })),
      switchMap((job: Job) =>
        from(updateDoc(doc(this.firestore, `jobs/${job.id}`), { ...job })).pipe(
          map(() => new fromActions.UpdateSuccess(job.id, job)),
          catchError((err) => of(new fromActions.UpdateError(err.message)))
        )
      )
    )
  );

  delete: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.Types.DELETE),
      map((action: fromActions.Delete) => action.id),
      switchMap((id) =>
        from(deleteDoc(doc(this.firestore, `jobs/${id}`))).pipe(
          map(() => new fromActions.DeleteSuccess(id)),
          catchError((err) => of(new fromActions.DeleteError(err.message)))
        )
      )
    )
  );
}
