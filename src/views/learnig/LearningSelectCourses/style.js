import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  '@global': {
    '*::-webkit-scrollbar': {
      width: '0.6em'
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
      borderRadius: '10px'
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: '#888',
      borderRadius: '10px'
    }
  },
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
  table: {
    minWidth: "100%",
    minHeight: '100px',
    borderCollapse: 'collapse',
  },
  lptbldiv:{
    overflowX:"auto",
    overflowY:"auto",
    height:"35vh",
    margin:"20px 30px 10px 0px"
  },
  tblheading:{
    '& tr':{
      '& th':{
        padding: "15px 15px 10px 31px",
        textAlign:"left",
        fontWeight:"normal",
        opacity: "0.7"
      }
    },
    backgroundColor:"white",
    fontSize:"12px"
  },
  tblbody:{
    fontSize:"10px"
  }  
}));