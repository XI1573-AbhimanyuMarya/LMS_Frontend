import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
 closeButton: {
		marginTop: theme.spacing(3),
		marginLeft: theme.spacing(1),
		background: 'linear-gradient(180deg, #FFAB39 0%, #F07200 100%)',
		color: "#FFFFFF",
		textTransform: 'capitalize',
		fontSize: 20,
		width: '40%'
	},
  combinedshape: {
    width: '74px',
    height: '77px',
    margin: '0 6.6px 1.6px 0',
    padding: '1px 3.5px 13px 12px',
 
  },
  design:{
    flexDirection:'column',
    display:'flex',
    alignItems:'center'
  },
  design1:{
    textAlign: 'center'
  },
  design2:{
   
    justifyContent:'centre'
  }
 
}));

