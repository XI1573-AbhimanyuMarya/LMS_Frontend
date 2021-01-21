import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  button: {
    background: "none",
    color: "#7a7a7a",
    textTransform: "lowercase",
    fontSize: 12,
    marginBottom: '20px'
  },
  tbl:{
    minWidth:"100%",
    marginTop: '20px'
  },
  tblrow:{
    '& td':{
      padding:"5px 31px",
    }
  },
  tblbody:{
    fontSize:"12px"
  },
  tblheading:{
    '& tr':{
      '& th':{
        padding:"20.9px 15px 10px 31px",
        textAlign:"left",
        fontWeight:"normal",
        opacity: "0.7"
      }
    },
    backgroundColor:"white",
    fontSize:"12px"
  },
}));