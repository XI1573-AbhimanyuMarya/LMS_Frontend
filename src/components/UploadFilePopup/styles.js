import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
   uploadContent:{
   
    height: '300px',
    margin: '0 20px 0 0',
    padding: '72.9px 45px 66px',
    backgroundColor:' #ffffff',
    borderRadius:' 8px',
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.3)',
   },
   uploadFile:{
   
    height: '300px',
    margin: '170.2px 170.5px 49px 193.5px',
    padding:'0 20px 0 0',
    borderRadius:' 8px',
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.3)',
    backgroundColor: '#f4f4f4',
   },
   box:{
    width: '1920px',
    height: '1080px',
   
   
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
   },
    discardButton: {
        background: 'linear-gradient(180deg, #FFAB39 0%, #F07200 100%)',
		color: "#FFFFFF",
        textTransform: 'capitalize',
        fontSize: 15,
        fontWeight: 500,
    },
    cancelButton: {
        textTransform: 'capitalize',
        border: '2px solid #858585',
        color: '#858585',
        fontSize: 15,
        fontWeight: 500,
    },
    dailogTitle: {
        color: '#621D58',
    }
}));