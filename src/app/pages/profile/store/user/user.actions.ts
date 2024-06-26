import { Action } from '@ngrx/store';

import { User } from './user.models';

export enum Types {
  READ = '[Profile] [User] Read: Start',
  READ_SUCCESS = '[Profile] [User] Read: Success',
  READ_ERROR = '[Profile] [User] Read: Error',
  CLEAR = '[Profile] [User] Clear',
}

export class Read implements Action {
  readonly type = Types.READ;

  constructor(public id: string) {}
}

export class ReadSuccess implements Action {
  readonly type = Types.READ_SUCCESS;

  constructor(public user: User | null) {}
}

export class ReadError implements Action {
  readonly type = Types.READ_ERROR;

  constructor(public error: string) {}
}

export class Clear implements Action {
  readonly type = Types.CLEAR;
}

export type All = Read | ReadSuccess | ReadError | Clear;
