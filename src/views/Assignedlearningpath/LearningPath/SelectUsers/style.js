import { makeStyles } from '@material-ui/core/styles';
import { deepOrange, deepPurple, green, yellow, blueGrey, pink } from '@material-ui/core/colors';
import { Autocomplete } from '@material-ui/lab';

export const useStyles = makeStyles((theme) => ({
	searchField: {
		width: '70%',
		background: '#FFFFFF',
		margin: theme.spacing(2),
	},
	box: {
		display: 'flex',
		width: 250,
		cursor: 'pointer',
		border: '2px solid #A9A9A9'
	},
	selected: {
		display: 'flex',
		width: 250,
		cursor: 'pointer',
		border: '2px solid #67B104'
	},
	orangeAvtar: {
		color: theme.palette.getContrastText(deepOrange[500]),
		backgroundColor: deepOrange[500],
	},
	purpleAvtar: {
		color: theme.palette.getContrastText(deepPurple[500]),
		backgroundColor: deepPurple[500],
	},
	greenAvtar: {
		color: '#FFFFFFF',
		backgroundColor: green[500],
	},
	yellowAvtar: {
		color: '#FFFFFFF',
		backgroundColor: yellow[500],
	},
	blueGreyAvtar: {
		color: '#FFFFFFF',
		backgroundColor: blueGrey[500],
	},
	pinkAvtar: {
		color: '#FFFFFFF',
		backgroundColor: pink[500],
	},
	checkIcon: {
		color: '#67B104'
	},
	usersContainer: {
		background: '#F1F3F7',
    borderRadius: "0.5%",
    height:"50vh",
    overflow:"auto"
	},
}));