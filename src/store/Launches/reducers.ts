import { createSlice } from '@reduxjs/toolkit';

import { ILaunch } from '../../services/launches';

export interface IInitialStateLaunches {
	launches: ILaunch[];
	loading: boolean;
	page: number;
}
const initialState: IInitialStateLaunches = {
	launches: [],
	loading: false,
	page: 1,
};
export const launches = createSlice({
	name: 'launches',
	initialState,
	reducers: {
		requestFetchData: (state) => {
			state.loading = true;
		},
		fetchDataSuccess: (state, action) => {
			state.loading = false;
			if (state.page === 1) {
				state.launches = action.payload;
			} else {
				state.launches = [...state.launches, ...action.payload];
			}
		},
		fetchDataError: (state, action) => {
			state.loading = false;
		},
		setPage: (state, action) => {
			state.page = action.payload;
		},
	},
});
