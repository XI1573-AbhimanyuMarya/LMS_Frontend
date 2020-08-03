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
	}
}));