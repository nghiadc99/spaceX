import React, { UIEventHandler, useEffect, useState } from 'react';

import { Box, Grid, makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import { CardItem } from './components';
import './App.css';
// import { IQueryParam } from './services/common';
import { ITEM_PER_PAGE } from './constants';
import { getLaunches } from './services/launches';
import { launches } from './store/Launches/reducers';
import { LaunchesData, LaunchesLoading, LaunchesPage } from './store/Launches/selector';

const App = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const loading = useSelector(LaunchesLoading);
	const launchesData = useSelector(LaunchesData);
	const page = useSelector(LaunchesPage);
	// const [page, setPage] = useState(1);
	const [loadingMore, setLoadingMore] = useState(false);

	const getListLaunch = async (currentPage: number) => {
		const query = [
			{
				key: 'limit',
				value: ITEM_PER_PAGE,
			},
			{
				key: 'offset',
				value: (currentPage - 1) * ITEM_PER_PAGE,
			},
		];

		dispatch(launches.actions.requestFetchData());
		const response = await getLaunches(query);
		if (response) {
			dispatch(launches.actions.fetchDataSuccess(response));
		}
	};

	useEffect(() => {
		Promise.all([getListLaunch(page)]).then(() => {
			setLoadingMore(false);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page]);

	const handleLoadMore = () => {
		if (loading) return;
		setLoadingMore(true);
		dispatch(launches.actions.setPage(page + 1));
	};

	const handleScroll: UIEventHandler<HTMLElement> = (event) => {
		const scrollPosition = event.currentTarget.scrollHeight - event.currentTarget.scrollTop;
		const { clientHeight } = event.currentTarget;

		if (scrollPosition <= clientHeight + 800 && !loadingMore) {
			handleLoadMore();
		}
	};

	return (
		<Box onScroll={handleScroll} className={classes.root}>
			{(!loading || loadingMore) && (
				<Box className={classes.listDataBox}>
					<Grid container spacing={2}>
						{launchesData?.map((launch, index) => (
							<Grid item xs={6} md={3} key={index.toString()}>
								<CardItem item={launch} />
							</Grid>
						))}
					</Grid>
				</Box>
			)}
		</Box>
	);
};

const useStyles = makeStyles((theme) => ({
	root: {
		height: '100vh',
		overflowX: 'auto',
	},

	listDataBox: {
		overflow: 'hidden',
		paddingTop: '100px',
	},
}));
export default App;
