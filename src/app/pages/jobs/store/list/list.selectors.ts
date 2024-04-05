import {
  createSelector,
  createSelectorFactory,
  defaultMemoize,
} from '@ngrx/store';

import { getJobsState, JobsState } from '../index';
import { listAdapter } from './list.reducer';
import { Job } from './list.models';

const customCreateSelector = createSelectorFactory(defaultMemoize);

export const getListState = createSelector(
  getJobsState,
  (state: JobsState) => state.list
);

export const { selectIds, selectEntities, selectAll, selectTotal } =
  listAdapter.getSelectors(getListState);

export const selectEntityByIs = customCreateSelector(
  selectEntities,
  (entities: Record<string, Job>, props: { id: string }) => entities[props.id]
);
