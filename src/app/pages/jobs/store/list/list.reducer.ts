import { EntityState, createEntityAdapter } from '@ngrx/entity';

import { Job } from './list.models';
import * as fromActions from './list.actions';

export const listAdapter = createEntityAdapter<Job>();

export interface ListState extends EntityState<Job> {
  loading: boolean;
  error: string;
}

export const initialState: ListState = listAdapter.getInitialState({
  loading: false,
  error: '',
});

export function reducer(
  state: ListState = initialState,
  action: fromActions.All
) {
  switch (action.type) {
    case fromActions.Types.READ: {
      return { ...state, loading: true, error: '' };
    }
    case fromActions.Types.READ_SUCCESS: {
      return listAdapter.addMany(action.items, { ...state, loading: false });
    }
    case fromActions.Types.READ_ERROR: {
      return { ...state, loading: false, error: action.error };
    }

    case fromActions.Types.CREATE: {
      return { ...state, loading: true, error: '' };
    }
    case fromActions.Types.CREATE_SUCCESS: {
      return listAdapter.addOne(action.job, state);
    }
    case fromActions.Types.CREATE_ERROR: {
      return { ...state, loading: false, error: action.error };
    }

    case fromActions.Types.UPDATE: {
      return { ...state, loading: true, error: '' };
    }
    case fromActions.Types.UPDATE_SUCCESS: {
      return listAdapter.updateOne(
        { id: action.id, changes: action.changes },
        state
      );
    }
    case fromActions.Types.UPDATE_ERROR: {
      return { ...state, loading: false, error: action.error };
    }

    case fromActions.Types.DELETE: {
      return { ...state, loading: true, error: '' };
    }
    case fromActions.Types.DELETE_SUCCESS: {
      return listAdapter.removeOne(action.id, state);
    }
    case fromActions.Types.DELETE_ERROR: {
      return { ...state, loading: false, error: action.error };
    }

    default: {
      return state;
    }
  }
}