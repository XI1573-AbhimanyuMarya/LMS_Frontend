import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
	root: {
		maxWidth: 345,
		border: '2px solid #A9A9A9'
	},
	courseType: {
		textTransform: 'capitalize',
		fontSize: 12,
		fontWeight: 400,
		borderRadius: 15,
		padding: 3,
		color: '#B2C8E4',
		border: '1px solid #B2C8E4',
	},
	courseLevel: {
		fontSize: 15,
		fontWeight: 600,
		color: '#858585'
	},
	courseTitle: {
		fontSize: 15,
		fontWeight: 600,
		color: '#000000',
		marginTop: 10,
		marginBottom: 10,
		//margin: theme.spacing(1),
	},
	courseDesc: {
		fontSize: 12,
		color: '#858585'
	},
	selected: {
		maxWidth: 345,
		border: '2px solid #67B104'
	},
	checkIcon: {
		color: '#67B104',
		float: 'right'
	}
}));