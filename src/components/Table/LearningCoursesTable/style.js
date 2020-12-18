import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  tbl:{
    minWidth:"100%"
  },
  tblrow:{
    '& td':{
      padding:"5px 31px"
    }
  },
  tblbody:{
    fontSize:"10px"
  },
  tblheading:{
    '& tr':{
      '& th':{
        padding:"20.9px 15px 10px 31px",
        textAlign:"left",
        fontWeight:"normal"
      }
    },
    backgroundColor:"white",
    fontSize:"12px"
  },
  Beginner: {
    width: 80,
    height:48
  },
  Intermediate: {
    width: 100,
    height:48
  },
  Advance: {
    width: 80,
    height:48
  },
  Expert: {
    width: 80,
    height:48
  },
  lpInField:{
    width:"89px",
    height:"30px",
    borderRadius:"4px",
    border:"1px solid #c2c2c2",
    padding:"2px 5px"
  }
}));