import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { authState, sendEmailVerification } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import {
  Observable,
  catchError,
  from,
  map,
  of,
  switchMap,
  take,
  tap,
} from 'rxjs';

import { NotificationService } from '@app/services';
import { environment } from '@src/environments/environment';
import { User } from './user.models';
import * as fromActions from './user.actions';

type Action = fromActions.All;

@Injectable()
export class UserEffects {
  constructor(
    private actions: Actions,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private notification: NotificationService
  ) {}

  init: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.Types.INIT),
      switchMap(() => this.afAuth.authState.pipe(take(1))),
      switchMap((authState) => {
        if (!authState) {
          return of(new fromActions.InitUnauthorized());
        }

        return this.afs
          .doc<User>(`users/${authState.uid}`)
          .valueChanges()
          .pipe(
            take(1),
            map(
              (user) =>
                new fromActions.InitAuthorized(authState.uid, user || null)
            ),
            catchError((err) => of(new fromActions.InitError(err.message)))
          );
      })
    )
  );

  signInEmail: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.Types.SIGN_IN_EMAIL),
      map((actions: fromActions.SignInEmail) => actions.credentials),
      switchMap((credentials) =>
        from(
          this.afAuth.signInWithEmailAndPassword(
            credentials.email,
            credentials.password
          )
        ).pipe(
          switchMap((sirnInState) =>
            this.afs
              .doc<User>(`users/${sirnInState.user?.uid}`)
              .valueChanges()
              .pipe(
                take(1),
                tap(() => {
                  this.router.navigate(['/']);
                }),
                map(
                  (user) =>
                    new fromActions.SignInEmailSuccess(
                      sirnInState.user?.uid ?? '',
                      user || null
                    )
                )
              )
          ),
          catchError((err) => {
            this.notification.error(err.message);

            return of(new fromActions.SignInEmailError(err.message));
          })
        )
      )
    )
  );

  signUpEmail: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.Types.SIGN_UP_EMAIL),
      map((action: fromActions.SignUpEmail) => action.credentials),
      switchMap((credentials) =>
        from(
          this.afAuth.createUserWithEmailAndPassword(
            credentials.email,
            credentials.password
          )
        ).pipe(
          tap((credentials) => {
            sendEmailVerification(
              credentials.user!,
              environment.firebase.actionCodeSettings
            );
            this.router.navigate(['/auth/email-confirm']);
          }),
          map(
            (signUpState) =>
              new fromActions.SignUpEmailSuccess(signUpState.user?.uid ?? '')
          ),
          catchError((err) => {
            this.notification.error(err.message);

            return of(new fromActions.SignUpEmailError(err.message));
          })
        )
      )
    )
  );

  signOut: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.Types.SIGN_OUT),
      switchMap(() =>
        from(this.afAuth.signOut()).pipe(
          map(() => new fromActions.SignOutSuccess()),
          catchError((err) => of(new fromActions.SignOutError(err.message)))
        )
      )
    )
  );
}
