import moment from 'moment';

export const filterLaunchDates = [
	{
		id: 0,
		name: 'All',
		value: 'All',
	},
	{
		id: 1,
		name: 'Last Week',
		value: moment().subtract(1, 'week').startOf('week').format('YYYY-MM-DD').toString(),
	},
	{
		id: 2,
		name: 'Last Month',
		value: moment().subtract(1, 'month').startOf('month').format('YYYY-MM-DD').toString(),
	},
	{
		id: 3,
		name: 'Last Year',
		value: moment().subtract(1, 'year').startOf('year').format('YYYY-MM-DD').toString(),
	},
];

export const filterLaunchStatus = [
	{
		id: 0,
		name: 'All',
		value: 'All',
	},
	{
		id: 1,
		name: 'Success',
		value: 'Success',
	},
	{
		id: 2,
		name: 'Failure',
		value: 'Failure',
	},
];
