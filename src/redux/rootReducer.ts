import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
// slices

import userReducer from './slices/user';

import ownerReducer from './slices/owner';

import boostGroupReducer from './slices/groups';

import boostReducer from './slices/boost';

import reportReducer from './slices/reports';

import sessionReducer from './slices/session';

import unassignedBoostReducer from './slices/unassigneBoosts';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: []
};

const rootReducer = combineReducers({
  user: userReducer,
  owner: ownerReducer,
  group: boostGroupReducer,
  boost: boostReducer,
  report: reportReducer,
  session: sessionReducer,
  unassignedBoost: unassignedBoostReducer
});

export { rootPersistConfig, rootReducer };
