import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
	pathName: {
		margin: theme.spacing(2),
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
		background: '#F1F3F7',
		borderRadius: "0.5%"
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