import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
	root: {
    //maxWidth: 345,
    minWidth:300,
    height:222,
		border: '3px solid #67b104',
		borderRadius: 8
	},
	courseType: {
		textTransform: 'capitalize',
		fontSize: 12,
		fontWeight: 400,
		borderRadius: 15,
		color: '#4a90e2',
    border: '1px solid #B2C8E4',
    padding:'5px 20px',
    [theme.breakpoints.up('md')]: {
      textTransform: 'capitalize',
      fontSize: 10,
      fontWeight: 400,
      borderRadius: 15,
      color: '#4a90e2',
      border: '1px solid #B2C8E4',
    },
    [theme.breakpoints.up('lg')]: {
      textTransform: 'capitalize',
      fontSize: 12,
      fontWeight: 400,
      borderRadius: 15,
      color: '#4a90e2',
      border: '1px solid #B2C8E4',
    },
	},
	courseLevel: {
		fontSize: 15,
		fontWeight: 600,
    color: '#858585',
    [theme.breakpoints.up('md')]: {
      fontSize: 13,
		fontWeight: 600,
    color: '#858585',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: 15,
		fontWeight: 600,
    color: '#858585',
    },
	},
	courseTitle: {
		fontSize: 15,
		fontWeight: 600,
		color: '#000000',
		marginTop: 10,
		marginBottom: 10,
    //margin: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      fontSize: 10,
      fontWeight: 600,
      color: '#000000',
      marginTop: 5,
      marginBottom: 5,
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: 15,
		fontWeight: 600,
		color: '#000000',
		marginTop: 10,
		marginBottom: 10,
  },
},
	courseDesc: {
		fontSize: 12,
    color: '#858585',
    [theme.breakpoints.up('md')]: {
      fontSize: 10,
    color: '#858585',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: 12,
      color: '#858585',
  },
    
	},
	selected: {
    //maxWidth: 345,
    minWidth:300,
    height:222,
		border: '2px solid #67B104',
		borderRadius: 4
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
    color:"white",
		// width: '90px',
		// height: '19px',
		fontsize: '16px',
		fontweight: '500',
		fontstretch: 'normal',
		fontstyle: 'normal',
		lineheight: 'normal',
		letterspacing: 'normal',
		textalign: 'center',
    color: '#ffffff',
    [theme.breakpoints.up('md')]: {
      background:"#67b104",
      height:"25px",
      display:"flex",
		justifyContent:"center",
		alignItems:"center",
		// width: '90px',
		// height: '19px',
		fontfamily: 'Roboto',
		fontsize: '12px',
		fontweight: '500',
		fontstretch: 'normal',
		fontstyle: 'normal',
		lineheight: 'normal',
		letterspacing: 'normal',
		textalign: 'center',
    color: '#ffffff',
    },
    [theme.breakpoints.up('lg')]: {
      height:"40px",
    },
    
  },
  Beginner:{
    width:"80px",
    marginRight:"-5px",
    marginBottom: "10px",
    height: "38px"
  },
  Intermediate:{
    width:"100px",
    marginRight:"-5px",
    marginBottom: "10px",
    height: "38px"
  },
  Advance:{
    width:"80px",
    marginRight:"-5px",
    marginBottom: "10px",
    height: "38px"
  },
  Expert:{
    width:"80px",
    marginRight:"-5px",
    marginBottom: "10px",
    height: "38px"
  },
  cardheader:{
    display:"flex",
    justifyContent:"space-between"
  },
  cardcontent:{height:"180px",overflow:"auto"}
}));