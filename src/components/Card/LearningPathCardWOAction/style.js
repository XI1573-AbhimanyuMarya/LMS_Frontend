import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    width: "300px",
    height:"183px",
    borderRadius:"8px",
    boxShadow:"2px 3px 10px 0 rgba(0, 0, 0, 0.18)",
    padding:"10px 20px"
  },
  cardheader:{
    display:"flex",
    justifyContent:"space-between"
  },
  cardheading:{
    fontSize:"1rem",
    margin:"0 0 0 15px"
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
  carddesc:{
    textAlign: "justify",
    fontSize:"10px",
    minHeight:"55px"
  },
  cardfooter:{
    backgroundColor:"#f5f5f5",
    padding:"5px 16px",
    display:"flex",
    justifyContent:"space-between"
  },
  cardfootertext:{
    fontSize:"0.70rem"
  },
  cardfooterbtn:{
    backgroundColor:"white",
    borderRadius:"21px",
    width:"55px"
  },
  checkIcon: {
    color: "#67B104",
    float: "right",
  },
  CardHeading: {
    width: "200.9px",
    height: "15px",
    margin: "2px 4.9px 18.5px 0",
    //fontFamily: "Roboto",
    fontSize: "16px",//"18px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.32",
    letterSpacing: "normal",
    textAlign: "left",
    color: "#000000"
  },
  CardDesc:{
    width: "220",
    margin: "16.5px 17.6px 0 0",
    fontSize: "13px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.33",
    letterSpacing: "normal",
    textAlign: "left",
    color: "#858585",
    textAlign: "justify",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    "-webkit-line-clamp": "3",
    "-webkit-box-orient": "vertical",
  },
  CardRoot: {
    width: "255px",//"340px",
    height: "150px",
    margin: "8.5px 10px 0 0.5px",
    padding: "10px",//"12px 20px",
    borderRadius: "8px",
    backgroundColor: "#ffffff",
    border:"none",
    boxShadow: "none"
  },
  PopularStuff:{
    width: "215px",
    height: "27px",
    margin: "13px 108.5px 18.2px 0",
    padding: "11px 70px 8px 141px",
    fontSize: "15px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.32",
    letterSpacing: "normal",
    textAlign: "left",
    color: "#621d58",
  }
}));