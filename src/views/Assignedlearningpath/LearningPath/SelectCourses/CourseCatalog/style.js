import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 305,
    minWidth: 305,
    border: "2px solid #A9A9A9",
    minHeight: 174,
    maxHeight: 174,
    borderRadius: 8,
    margin: "0 20px 20px 0",
  },
  card:{
    height:"62vh",//"55vh",
    [theme.breakpoints.up("md")]: {
      height:"50vh",
      // backgroundColor:"yellow"
    },
    [theme.breakpoints.up("lg")]: {
      height:"62vh",//"50vh",
      // backgroundColor:"red"
    },
  },
  courseType: {
    textTransform: "capitalize",
    fontSize: 12,
    fontWeight: 400,
    borderRadius: 15,
    padding: 3,
    color: "#B2C8E4",
    border: "1px solid #B2C8E4",
  },
  courseLevel: {
    fontSize: 15,
    fontWeight: 600,
    color: "#858585",
  },
  courseTitle: {
    fontSize: 15,
    fontWeight: 600,
    color: "#000000",
    marginTop: 10,
    marginBottom: 10,
    //margin: theme.spacing(1),
  },
  courseDesc: {
    fontSize: 14,
    color: "#858585",
    fontFamily: "ProximaNova",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.21,
    letterSpacing: "normal",
    textAlign: "left",
  },
  selected: {
    maxWidth: 365,
    minWidth:305,
    border: "2px solid #67B104",
    maxHeight: 174,
    minHeight: 174,
    margin:' 0 20px 20px 0',
    
   
  },
  checkIcon: {
    color: "#67B104",
    float: "right",
  },
  levIcons: {
    width: 80,
    objectFit: "contain",
  },
  pathname: {
    width: "160px",
    height: "22px",
    // margin: "5px 0 3px 13.2px",
    fontFamily: "ProximaNova",
    fontSize: "16px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.22,
    letterSpacing: "normal",
    textAlign: "left",
    color: "#000000",
  },
  coursename: {
    width: "103px",
    height: "17px",
    // margin: "6px 130.7px 7px 0",
    fontFamily: "ProximaNova",
    fontSize: "12px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.21,
    letterSpacing: "normal",
    textAlign: "left",
    color: "#000000",
    display: "flex",
    alignItems: "flex-end",
  },
  coursename1: {
    color: "#621d58",
    width: "60px",
    height: "23px",
    // margin: "6px 130.7px 7px 0",
    fontFamily: "ProximaNova",
    fontSize: "12px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.21,
    letterSpacing: "normal",
    textAlign: "left",
    margin: "0 0 0 130.7px",
    padding: "4px 10px 7px 12px",
    borderRadius: "21px",
    border: "solid 1px rgba(98, 29, 88, 0.2)",
    backgroundColor: "#ffffff",
  },
  circle: {
    opacity: "0.3",
    margin: "0 10px 0 0",
  },
}));
