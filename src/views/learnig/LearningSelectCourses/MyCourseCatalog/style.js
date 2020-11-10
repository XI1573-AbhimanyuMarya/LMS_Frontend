import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
	root: {
		maxWidth: 345,
		border: '3px solid #67b104'
	},
	courseType: {
		textTransform: 'capitalize',
		fontSize: 12,
		fontWeight: 400,
		borderRadius: 15,
		padding: 3,
		color: '#4a90e2',
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
	},
	view: {
		background:"#67b104",
		height:"40px",
		display:"flex",
		justifyContent:"center",
		alignItems:"center",
		// width: '90px',
		// height: '19px',
		fontfamily: 'Roboto',
		fontsize: '16px',
		fontweight: '500',
		fontstretch: 'normal',
		fontstyle: 'normal',
		lineheight: 'normal',
		letterspacing: 'normal',
		textalign: 'center',
		color: '#ffffff'
	}
}));