import React from 'react';

import { makeStyles, MenuItem, Select } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

interface ICustomSelectProps {
	onChange?: (
		event: React.ChangeEvent<{
			name?: string | undefined;
			value: unknown;
		}>,
		child: React.ReactNode,
	) => void;
	listData: any[];
	value: any;
}
export const CustomSelect: React.FC<ICustomSelectProps> = ({ listData, value, onChange }) => {
	const classes = useStyles();
	return (
		<Select
			variant="outlined"
			fullWidth
			onChange={onChange}
			inputProps={{ style: { textAlign: 'center' } }}
			value={value}
			IconComponent={ExpandMoreIcon}
			MenuProps={{
				anchorOrigin: {
					vertical: 'bottom',
					horizontal: 'left',
				},
				transformOrigin: {
					vertical: 'top',
					horizontal: 'left',
				},
				getContentAnchorEl: null,
			}}
			className={classes.root}
		>
			{listData?.map((item) => (
				<MenuItem key={item?.id} value={item?.value}>
					{item?.name}
				</MenuItem>
			))}
		</Select>
	);
};
const useStyles = makeStyles((theme) => ({
	root: {
		'& .MuiSelect-outlined.MuiSelect-outlined': {
			padding: theme.spacing(1),
		},
	},
}));
