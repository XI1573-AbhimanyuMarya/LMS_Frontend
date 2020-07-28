import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/core/styles';
import { useStyles } from './style';

const PrettoSlider = withStyles({
	root: {
		color: '#6EB40F',
		height: 8,
	},
	thumb: {
		height: 24,
		width: 24,
		backgroundColor: '#fff',
		border: '2px solid currentColor',
		marginTop: -8,
		marginLeft: -12,
		'&:focus, &:hover, &$active': {
			boxShadow: 'inherit',
		},
	},
	active: {},
	valueLabel: {
		left: 'calc(-50% + 4px)',
	},
	track: {
		height: 8,
		borderRadius: 4,
	},
	rail: {
		height: 8,
		borderRadius: 4,
	},
	mark: {
		backgroundColor: '#C8E3A5',
		height: 20,
		width: 20,
		marginLeft: '-2%',
		bottom: '20%',
		borderRadius: '50%'
	},
	markActive: {
		opacity: 1,
		backgroundColor: 'currentColor',
	},
})(Slider);

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

const valuetext = (value) => {
	return `${value}°C`;
}

const SetDuration = () => {
	const classes = useStyles();

	return (
		<React.Fragment>
			<Container component="main" maxWidth="xs" className={classes.mainContainer}>
				<CssBaseline />
				<Typography variant="h6" gutterBottom>
					Select Learning Path Duration
      			</Typography>
				<PrettoSlider
					defaultValue={3}
					getAriaValueText={valuetext}
					valueLabelDisplay="auto"
					step={3}
					min={3}
					max={12}
					aria-labelledby="discrete-slider-custom"
					marks={marks}
				/>
			</Container>
		</React.Fragment>
	);
}

export default SetDuration;