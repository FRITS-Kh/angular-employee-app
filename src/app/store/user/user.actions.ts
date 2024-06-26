import { Action } from '@ngrx/store';

import {
  EmailPasswordCredentials,
  User,
  UserCreateRequest,
} from './user.models';

export enum Types {
  INIT = '[User] Init: Start',
  INIT_AUTHORIZED = '[User] Init: Authorized',
  INIT_UNAUTHORIZED = '[User] Init: Unauthorized',
  INIT_ERROR = '[User] Init: Error',

  SIGN_IN_EMAIL = '[User] Sign In with email: Start',
  SIGN_IN_EMAIL_SUCCESS = '[User] Sign In with email: Success',
  SIGN_IN_EMAIL_ERROR = '[User] Sign In with email: Error',

  SIGN_UP_EMAIL = '[User] Sign Up with email: Start',
  SIGN_UP_EMAIL_SUCCESS = '[User] Sign Up with email: Success',
  SIGN_UP_EMAIL_ERROR = '[User] Sign Up with email: Error',

  SIGN_OUT = '[User] Sign Out with email: Start',
  SIGN_OUT_SUCCESS = '[User] Sign Out with email: Success',
  SIGN_OUT_ERROR = '[User] Sign Out with email: Error',

  CREATE = '[User] Create: Start',
  CREATE_SUCCESS = '[User] Create: Success',
  CREATE_ERROR = '[User] Create: Error',

  UPDATE = '[User] Update: Start',
  UPDATE_SUCCESS = '[User] Update: Success',
  UPDATE_ERROR = '[User] Update: Error',
}

export class Init implements Action {
  readonly type = Types.INIT;
}
export class InitAuthorized implements Action {
  readonly type = Types.INIT_AUTHORIZED;

  constructor(
    public uid: string,
    public isEmailVerified: boolean,
    public user: User | null
  ) {}
}
export class InitUnauthorized implements Action {
  readonly type = Types.INIT_UNAUTHORIZED;
}
export class InitError implements Action {
  readonly type = Types.INIT_ERROR;

  constructor(public error: string) {}
}

export class SignInEmail implements Action {
  readonly type = Types.SIGN_IN_EMAIL;

  constructor(public credentials: EmailPasswordCredentials) {}
}
export class SignInEmailSuccess implements Action {
  readonly type = Types.SIGN_IN_EMAIL_SUCCESS;

  constructor(
    public uid: string,
    public isEmailVerified: boolean,
    public user: User | null
  ) {}
}
export class SignInEmailError implements Action {
  readonly type = Types.SIGN_IN_EMAIL_ERROR;

  constructor(public error: string) {}
}

export class SignUpEmail implements Action {
  readonly type = Types.SIGN_UP_EMAIL;

  constructor(public credentials: EmailPasswordCredentials) {}
}
export class SignUpEmailSuccess implements Action {
  readonly type = Types.SIGN_UP_EMAIL_SUCCESS;

  constructor(public uid: string) {}
}
export class SignUpEmailError implements Action {
  readonly type = Types.SIGN_UP_EMAIL_ERROR;

  constructor(public error: string) {}
}

export class SignOut implements Action {
  readonly type = Types.SIGN_OUT;
}
export class SignOutSuccess implements Action {
  readonly type = Types.SIGN_OUT_SUCCESS;
}
export class SignOutError implements Action {
  readonly type = Types.SIGN_OUT_ERROR;

  constructor(public error: string) {}
}

export class Create implements Action {
  readonly type = Types.CREATE;

  constructor(public user: UserCreateRequest) {}
}
export class CreateSuccess implements Action {
  readonly type = Types.CREATE_SUCCESS;

  constructor(public user: User) {}
}
export class CreateError implements Action {
  readonly type = Types.CREATE_ERROR;

  constructor(public error: string) {}
}

export class Update implements Action {
  readonly type = Types.UPDATE;

  constructor(public user: User) {}
}
export class UpdateSuccess implements Action {
  readonly type = Types.UPDATE_SUCCESS;

  constructor(public user: User) {}
}
export class UpdateError implements Action {
  readonly type = Types.UPDATE_ERROR;

  constructor(public error: string) {}
}

export type All =
  | Init
  | InitAuthorized
  | InitUnauthorized
  | InitError
  | SignInEmail
  | SignInEmailSuccess
  | SignInEmailError
  | SignUpEmail
  | SignUpEmailSuccess
  | SignUpEmailError
  | SignOut
  | SignOutSuccess
  | SignOutError
  | Create
  | CreateSuccess
  | CreateError
  | Update
  | UpdateSuccess
  | UpdateError;
