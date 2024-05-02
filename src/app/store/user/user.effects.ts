import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  Auth,
  authState,
  sendEmailVerification,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from '@angular/fire/auth';
import {
  Firestore,
  docData,
  doc,
  setDoc,
  serverTimestamp,
} from '@angular/fire/firestore';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  Observable,
  catchError,
  from,
  map,
  of,
  switchMap,
  take,
  tap,
  withLatestFrom,
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
    private auth: Auth,
    private firestore: Firestore,
    private router: Router,
    private notification: NotificationService
  ) {}

  init: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.Types.INIT),
      switchMap(() => authState(this.auth).pipe(take(1))),
      switchMap((authState) => {
        if (!authState) {
          return of(new fromActions.InitUnauthorized());
        }

        const user$ = docData(
          doc(this.firestore, `users/${authState.uid}`)
        ) as Observable<User>;

        return user$.pipe(
          take(1),
          map(
            (user) =>
              new fromActions.InitAuthorized(
                authState.uid,
                authState.emailVerified,
                user || null
              )
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
          signInWithEmailAndPassword(
            this.auth,
            credentials.email,
            credentials.password
          )
        ).pipe(
          switchMap((signInState) =>
            (
              docData(
                doc(this.firestore, `users/${signInState.user?.uid}`)
              ) as Observable<User>
            ).pipe(
              take(1),
              tap(() => {
                this.router.navigate([
                  signInState.user?.emailVerified ? '/' : '/auth/email-confirm',
                ]);
              }),
              map(
                (user) =>
                  new fromActions.SignInEmailSuccess(
                    signInState.user?.uid ?? '',
                    Boolean(signInState.user?.emailVerified),
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
          createUserWithEmailAndPassword(
            this.auth,
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
        from(this.auth.signOut()).pipe(
          map(() => new fromActions.SignOutSuccess()),
          catchError((err) => of(new fromActions.SignOutError(err.message)))
        )
      )
    )
  );

  create: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.Types.CREATE),
      map((action: fromActions.Create) => action.user),
      withLatestFrom(authState(this.auth).pipe(take(1))),
      map(([user, state]) => ({
        ...user,
        uid: state?.uid ?? '',
        email: state?.email ?? '',
        isEmailVerified: Boolean(state?.emailVerified),
        created: serverTimestamp(),
      })),
      switchMap((user: User) =>
        from(setDoc(doc(this.firestore, `users/${user.uid}`), user)).pipe(
          tap(() => this.router.navigate(['/profile', user.uid])),
          map(() => new fromActions.CreateSuccess(user)),
          catchError((err) => of(new fromActions.CreateError(err.message)))
        )
      )
    )
  );

  update: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.Types.UPDATE),
      map((action: fromActions.Update) => action.user),
      switchMap((user) =>
        from(setDoc(doc(this.firestore, `users/${user.uid}`), user)).pipe(
          tap(() => this.router.navigate(['/profile', user.uid])),
          map(() => new fromActions.UpdateSuccess(user)),
          catchError((err) => of(new fromActions.UpdateError(err.message)))
        )
      )
    )
  );
}
