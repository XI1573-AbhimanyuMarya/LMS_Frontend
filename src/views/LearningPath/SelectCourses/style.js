import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
	catalogTitle: {
		marginLeft: 40,
		margin: 20
	},
	courseField: {
		//width: '50%',
		marginLeft: 250,
		background: '#FFFFFF',
		margin: theme.spacing(1),
	},
	courseLabel: {
		marginLeft: 130,
		color: '#00000'
	},
	searchField: {
		width: '70%',
		marginLeft: 150,
		background: '#FFFFFF',
		margin: theme.spacing(2),
	},
}));