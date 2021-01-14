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
    fontSize:"12px"//"10px"
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
  },
  navSubmit:{
    width: "205px",
    height: "40px",
    margin: "0 20px 0 0",
    // padding: "15px 52px 14px",
    borderRadius: "4px",
    backgroundImage: "linear-gradient(to bottom, #ffab39, #f07200)",
    color:"white",
    fontSize:"12px"
  },
  navSubmit1:{
    width: "160px",
    height: "37px",
    margin: "5px 0 5px 20px",
    // padding: "11px 16px 10px",
    borderRadius: "4px",
    boxShadow: "0 3px 6px 0 rgba(0, 0, 0, 0.16)",
    backgroundColor: "#ffffff",
    color:"#007aff",
    fontSize:"12px"
  }
}));