import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
	pathName: {
		margin: theme.spacing(2),
	},
	headerText: {
		color: "#621d58",
		fontSize: 16
	},
	courseLabel: {
		color: '#00000',
		float: 'right',
		padding: '20px'
	},
	searchField: {
		width: '70%',
		background: '#FFFFFF',
		margin: theme.spacing(2),
	},
	error: {
		color: '#ff0033',
	},
	catalogContainer: {
		borderRadius: "0.5%",
		width: "80vw"
	},
	pathNameField: {
		background: '#FFFFFF',
	},
	logo: {
		height: 30,
		width: 91.5,
		marginLeft: 50
  },
  toolbar: theme.mixins.toolbar,
  mainContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto'
  },  
}));