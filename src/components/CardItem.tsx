import React from 'react';

import {
	Box,
	Button,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	Chip,
	Link,
	Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';

import { ILaunch } from '../services/launches';

interface ICardItemProps {
	item: ILaunch;
}
export const CardItem: React.FC<ICardItemProps> = ({ item }) => {
	const classes = useStyles();
	return (
		<Card className={classes.root}>
			<CardActionArea>
				<CardMedia
					className={classes.media}
					image={item.links.mission_patch}
					title="Contemplative Reptile"
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="h2">
						{item.rocket.rocket_name}
					</Typography>
					<Typography gutterBottom style={{ fontSize: '12px' }}>
						{moment(item.launch_date_utc).format('YYYY-MM-DD HH:mm a')}
					</Typography>
					<Typography
						variant="body2"
						color="textSecondary"
						component="p"
						className={classes.cardContent}
					>
						{item.details}
					</Typography>
					<Box mt={1}>
						<Chip
							label={item.launch_success ? 'Success' : 'Failure'}
							variant="outlined"
							size="small"
							color={item.launch_success ? 'primary' : 'default'}
						/>
					</Box>
				</CardContent>
			</CardActionArea>
			<CardActions>
				<Button size="small" color="primary">
					<Link href={item.links.article_link}>View More</Link>
				</Button>
			</CardActions>
		</Card>
	);
};

const useStyles = makeStyles({
	root: {
		maxWidth: 345,
	},
	cardContent: {
		height: '60px',
		WebkitLineClamp: 3,
		position: 'relative',
		overflow: 'hidden',
		display: '-webkit-box',
		WebkitBoxOrient: 'vertical',
	},
	media: {
		height: 140,
		backgroundSize: 'contain',
	},
});
