import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, catchError, from, map, of, switchMap, take } from 'rxjs';
import { serverTimestamp } from 'firebase/firestore';

import { extractDocumentChangeActionData } from '@app/shared';
import { Job, JobCreateRequest } from './list.models';
import * as fromActions from './list.actions';

type Action = fromActions.All;

@Injectable()
export class ListEffects {
  constructor(private actions: Actions, private afs: AngularFirestore) {}

  read: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.Types.READ),
      switchMap(() =>
        this.afs
          .collection<Job>('jobs', (ref) => ref.orderBy('created'))
          .snapshotChanges()
          .pipe(
            take(1),
            map((changes) =>
              changes.map((x) => extractDocumentChangeActionData<Job>(x))
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
        id: this.afs.createId(),
      })),
      switchMap((job: Job) =>
        from(this.afs.collection('jobs').doc(job.id).set(job)).pipe(
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
        from(this.afs.collection('jobs').doc(job.id).update(job)).pipe(
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
        from(this.afs.collection('jobs').doc(id).delete()).pipe(
          map(() => new fromActions.DeleteSuccess(id)),
          catchError((err) => of(new fromActions.DeleteError(err.message)))
        )
      )
    )
  );
}
