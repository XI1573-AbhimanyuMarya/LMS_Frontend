import React from 'react';
import { useDispatch } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import { useStyles, PrettoSlider } from './style';
import Actions from '../../../store/actions';

const marks = [
	{
		value: 3,
		label: '3 Months',
	},
	{
		value: 6,
		label: '6 Months',
	},
	{
		value: 9,
		label: '9 Months',
	},
	{
		value: 12,
		label: '12 Months',
	},
];

const SetDuration = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const onSliderHandler = (e, val) => {
		if(val !== "") {
			dispatch(Actions.learningPathActions.getSliderDuration(val))
		}
	}
	return (
		<React.Fragment>
			<Divider />
			<Container component="main" maxWidth="xs" className={classes.mainContainer}>
				<CssBaseline />
				<Typography variant="h6" align="center">
					Select Learning Path Duration
      			</Typography>
				<PrettoSlider
					defaultValue={3}
					valueLabelDisplay="auto"
					step={3}
					min={3}
					max={12}
					aria-labelledby="discrete-slider-custom"
					marks={marks}
					onChange={ (e, val) => onSliderHandler(e, val) }
				/>
			</Container>
		</React.Fragment>
	);
}

export default SetDuration;