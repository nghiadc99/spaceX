import React, { UIEventHandler, useEffect, useState } from 'react';

import { Box, Grid, makeStyles, Typography, TextField, InputAdornment } from '@material-ui/core';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';

import './App.css';
import { CardItem, CustomSelect } from './components';
// import { IQueryParam } from './services/common';
import { filterLaunchDates, filterLaunchStatus, ITEM_PER_PAGE } from './constants';
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
	const [launchDate, setLaunchDate] = useState<string>();
	const [launchStatus, setLaunchStatus] = useState<string>();
	const [keyword, setKeyword] = useState<string>();

	const getListLaunch = async (currentPage: number) => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const queryParams: { [key: string]: any } = {};
		if (keyword) {
			queryParams.rocket_name = keyword;
		}
		if (launchDate && launchDate !== 'All') {
			queryParams.start = launchDate;
			queryParams.end = moment().format('YYYY-MM-DD');
		}
		if (launchStatus && launchStatus !== 'All') {
			queryParams.launch_success = launchStatus === 'Success';
		}
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
		Object.keys(queryParams).forEach((queryParamKey) => {
			query.push({ key: queryParamKey, value: queryParams[queryParamKey] });
		});

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
	}, [page, keyword, launchDate, launchStatus]);

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

	const handleChangeKeyword = (
		event: React.ChangeEvent<{
			name?: string | undefined;
			value: unknown;
		}>,
	) => {
		if (page > 1) {
			dispatch(launches.actions.setPage(1));
		}
		setKeyword(`${event.target.value}`);
	};

	const handleSelectLaunchDate = (
		event: React.ChangeEvent<{
			name?: string | undefined;
			value: unknown;
		}>,
	) => {
		if (page > 1) {
			dispatch(launches.actions.setPage(1));
		}
		setLaunchDate(`${event.target.value}`);
	};

	const handleSelectLaunchStatus = (
		event: React.ChangeEvent<{
			name?: string | undefined;
			value: unknown;
		}>,
	) => {
		if (page > 1) {
			dispatch(launches.actions.setPage(1));
		}
		setLaunchStatus(`${event.target.value}`);
	};
	// if (!launchesData.length) {
	// 	return (

	// 	);
	// }
	return (
		<Box onScroll={handleScroll} className={classes.root}>
			<Box className={classes.topBar}>
				<Grid container spacing={2} justify="space-between">
					<Grid item container xs={4} spacing={2}>
						<Grid item xs={6}>
							<Box>
								<Typography className={classes.titleFilter}>Launch Date</Typography>
								<CustomSelect
									onChange={handleSelectLaunchDate}
									value={launchDate}
									listData={filterLaunchDates}
								/>
							</Box>
						</Grid>
						<Grid item xs={6}>
							<Box>
								<Typography className={classes.titleFilter}>Status</Typography>
								<CustomSelect
									onChange={handleSelectLaunchStatus}
									value={launchStatus}
									listData={filterLaunchStatus}
								/>
							</Box>
						</Grid>
					</Grid>

					<Grid item xs={3} className={classes.searchBox}>
						<TextField
							id="standard-search"
							label="Search Rocket Name"
							type="search"
							value={keyword}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<SearchOutlinedIcon />
									</InputAdornment>
								),
							}}
							onChange={handleChangeKeyword}
							fullWidth
						/>
					</Grid>
				</Grid>
			</Box>

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
	searchBox: {
		display: 'flex',
		alignItems: 'flex-end',
	},
	titleFilter: {
		fontWeight: 'bold',
		fontSize: '14px',
	},
	topBar: {
		padding: theme.spacing(2),
		width: '100%',
		position: 'fixed',
		zIndex: 1,
		backgroundColor: 'white',
		height: '80px',
		overflow: 'hidden',
		top: 0,
		left: 0,
		boxSizing: 'border-box',
	},
	listDataBox: {
		overflow: 'hidden',
		paddingTop: '100px',
	},
}));
export default App;
