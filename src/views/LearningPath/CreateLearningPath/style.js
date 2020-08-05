import { makeStyles, withStyles } from '@material-ui/core/styles';
import StepConnector from '@material-ui/core/StepConnector';

export const useStyles = makeStyles((theme) => ({
	layout: {
		width: 'auto',
		marginLeft: theme.spacing(2),
		marginRight: theme.spacing(2),
		[theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
			width: '80%',
			marginLeft: 'auto',
			marginRight: 'auto',
		},
		justifyContent: 'center',
	},
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
		marginTop: 10
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

export const QontoConnector = withStyles({
    alternativeLabel: {
        top: 10,
        left: 'calc(-50% + 16px)',
        right: 'calc(50% + 16px)',
    },
    active: {
        '& $line': {
            borderColor: '#621D58',
        },
    },
    completed: {
        '& $line': {
            borderColor: '#621D58',
        },
    },
    line: {
        borderColor: '#eaeaf0',
        borderTopWidth: 3,
        borderRadius: 1,
    },
})(StepConnector);