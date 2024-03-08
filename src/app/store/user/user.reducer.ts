import { User } from '@app/models/backend';
import * as fromActions from './user.actions';

export interface UserState {
  entity: User | null;
  uid: string;
  loading: boolean;
  error: string;
}

const initialState: UserState = {
  entity: null,
  uid: '',
  loading: false,
  error: '',
};

export function reducer(
  state = initialState,
  action: fromActions.All
): UserState {
  switch (action.type) {
    case fromActions.Types.SIGN_IN_EMAIL: {
      return { ...state, loading: true };
    }
    case fromActions.Types.SIGN_IN_EMAIL_SUCCESS: {
      return {
        ...state,
        entity: action.user,
        uid: action.uid,
        loading: false,
        error: '',
      };
    }
    case fromActions.Types.SIGN_IN_EMAIL_ERROR: {
      return { ...state, error: action.error, loading: false };
    }

    case fromActions.Types.SIGN_UP_EMAIL: {
      return { ...state, loading: true };
    }
    case fromActions.Types.SIGN_UP_EMAIL_SUCCESS: {
      return { ...state, uid: action.uid, loading: false };
    }
    case fromActions.Types.SIGN_UP_EMAIL_ERROR: {
      return { ...state, error: action.error, loading: false };
    }

    case fromActions.Types.SIGN_OUT: {
      return { ...state, loading: true };
    }
    case fromActions.Types.SIGN_OUT_SUCCESS: {
      return { ...initialState };
    }
    case fromActions.Types.SIGN_OUT_ERROR: {
      return { ...state, error: action.error, loading: false };
    }

    default: {
      return state;
    }
  }
}
