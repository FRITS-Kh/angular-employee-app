import { createFeatureSelector, createSelector } from '@ngrx/store';

import { UserState } from './user.reducer';

export const getUserState = createFeatureSelector<UserState>('user');
export const getUser = createSelector(getUserState, (state) => state.entity);
export const getLoading = createSelector(
  getUserState,
  (state) => state.loading
);
export const getIsAuthorized = createSelector(getUserState, (state) =>
  Boolean(state.uid)
);
export const getIsEmailVerified = createSelector(
  getUserState,
  (state) => state.isEmailVerified
);
export const getRoleId = createSelector(getUser, (user) => user && user.roleId);
