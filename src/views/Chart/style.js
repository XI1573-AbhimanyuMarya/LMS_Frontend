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
	rectangle:{
			display:'flex',
			alignItems:'center',
			justifyContent:'center',
			width: '13%',
			height: '5%',
			// margin: '0 69px',
			padding: '42px 59px 42px 69px',
			borderradius: '8px',
			boxShadow: `2px 6px 16px 0 rgba(98, 29, 88, 0.08)`,
			backgroundcolor: '#ffffff',
			fontSize:"50px",
			fontFamily:"Robot",
			fontWeight:"500",
	},
	rectangle1:{
		display:'flex',
		alignItems:'center',
		justifyContent:'center',
		width: '10%',
		height: '30px',
		margin: '0 69px',
		padding: '20px 59px 42px 69px',
		borderradius: '8px',
		boxShadow: `2px 6px 16px 0 rgba(98, 29, 88, 0.08)`,
		backgroundcolor: '#ffffff',
		fontSize:"50px",
		fontFamily:"Robot",
		fontWeight:"500",
},
	text:{
		display:'flex',
		alignItems:'center',
		justifyContent:'center',
}
}));