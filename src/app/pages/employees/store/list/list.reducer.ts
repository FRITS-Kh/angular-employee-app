import { User } from './list.models';
import * as fromActions from './list.actions';

export interface ListState {
  items: User[];
  loading: boolean;
  error: string;
}

export const initialState: ListState = {
  items: [],
  loading: false,
  error: '',
};

export function reducer(
  state: ListState = initialState,
  action: fromActions.All
) {
  switch (action.type) {
    case fromActions.Types.READ: {
      return { ...state, loading: true, error: '' };
    }

    case fromActions.Types.READ_SUCCESS: {
      return { ...state, items: action.items, loading: false };
    }

    case fromActions.Types.READ_ERROR: {
      return { ...state, loading: false, error: action.error };
    }

    default: {
      return state;
    }
  }
}
