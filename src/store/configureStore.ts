import { combineReducers, createStore } from '@reduxjs/toolkit';

import { launches } from './Launches/reducers';

const reducer = combineReducers({
	launchesReducer: launches.reducer,
});
export type RootState = ReturnType<typeof reducer>;
export const store = createStore(reducer);
