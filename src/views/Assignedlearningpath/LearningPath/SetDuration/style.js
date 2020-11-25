import { makeStyles, withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

export const useStyles = makeStyles((theme) => ({
	sliderBox: {
		marginLeft: 350
	},
	mainContainer: {
		width: '100%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		Display: "flex",
		flexDirection: "column",
		marginTop: '10%'
	},
}));

export const PrettoSlider = withStyles({
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