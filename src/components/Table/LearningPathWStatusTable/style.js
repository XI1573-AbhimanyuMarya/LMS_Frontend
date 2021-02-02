import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  tbl:{
    minWidth:"100%",
    borderCollapse: 'collapse'
  },
  tblrow:{
    '& td':{
      padding:"0 31px",
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