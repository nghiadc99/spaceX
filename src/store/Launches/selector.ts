import { RootState } from '../configureStore';

export const LaunchesData = (state: RootState) => state.launchesReducer.launches;
export const LaunchesLoading = (state: RootState) => state.launchesReducer.loading;
export const LaunchesPage = (state: RootState) => state.launchesReducer.page;
