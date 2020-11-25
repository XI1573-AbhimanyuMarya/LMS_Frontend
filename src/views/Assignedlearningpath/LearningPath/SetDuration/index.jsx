import React from 'react';
import { useDispatch } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Actions from '../../../../store/actions';
import { MARKS, LEARNING_PATH_LABELS } from '../../../../modules/constants';
import { useStyles, PrettoSlider } from './style';

const marks = MARKS;

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
					{LEARNING_PATH_LABELS.SELECT_LEARNING_PATH_DURATION}
      			</Typography>
				<PrettoSlider
					defaultValue={ 3 }
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