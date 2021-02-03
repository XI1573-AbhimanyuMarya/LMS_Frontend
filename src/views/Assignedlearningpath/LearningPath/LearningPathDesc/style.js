import { makeStyles, withStyles } from '@material-ui/core/styles';
import StepConnector from '@material-ui/core/StepConnector';

export const useStyles = makeStyles((theme) => ({
	layout: {
		width: '76vw',
    justifyContent: 'center',
    
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
	stepper: {
		padding: theme.spacing(3, 0, 5),
	},
	buttons: {
		display: 'flex',
		justifyContent: 'center',
	},
	button: {
		marginTop: theme.spacing(3),
		marginLeft: theme.spacing(1),
		background: 'linear-gradient(180deg, #FFAB39 0%, #F07200 100%)',
		color: "#FFFFFF",
		textTransform: 'capitalize',
		fontSize: 20,
		width: '20%'
	},
	closeButton: {
		marginTop: theme.spacing(3),
		marginLeft: theme.spacing(1),
		background: 'linear-gradient(180deg, #FFAB39 0%, #F07200 100%)',
		color: "#FFFFFF",
		textTransform: 'capitalize',
		fontSize: 20,
		width: '40%'
	},
	stepperContainer: {
		// marginTop: 10
	},
	active: {
		color: '#621D58 !important',
	},
	completed: {
		color: '#621D58 !important',
		zIndex: 1,
		fontSize: 18,
	},
	assignedLabel: {
		color: '#67B104'
	},
	errorLabel: {
		color: '#E03A3E'
	},
	learningImg: {
		display: 'flex',
		alignItems: 'center',
		//marginLeft: 150
	},
	media: {
		height: 28,
		width: 27
	},
	successContainer: {
		width: '100%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		display: "flex",
		flexDirection: "column",
		marginTop: '10%'
	},
	clrosButton: {
		float: 'right'
	},
	errorIcon: {
		color: '#E03A3E',
		width: '50vw',
  		height: '10vh',
	},
	checkIcon: {
		color: '#63AB04',
		width: '50vw',
  		height: '10vh',
	}
}));