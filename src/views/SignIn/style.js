import { makeStyles } from '@material-ui/core/styles';
export const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '80%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
		background: 'linear-gradient(180deg, #FFAB39 0%, #F07200 100%)',
		color: "#FFFFFF",
		lineHeight: '2.50'
	},
	media: {
		height: 226,
		width: 344
	},
	logo: {
		height: 30,
		width: 91.5,
		marginTop: 20,
		marginLeft: 50
	},
	error: {
		color: '#ff0033',
		textAlign: 'center',
	},
	heading: {
		marginBottom: '0.85em',
		fontSize: '1.7rem'
  },
  copyRightContainer: {
    position: "fixed",
    bottom: "0",
    textAlign: "center",
    paddingBottom: "10px",
    width: "100%"
  }
}));