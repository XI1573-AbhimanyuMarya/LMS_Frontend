import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    width: "300px",
    height: "183px",
    borderRadius:"8px",
    boxShadow:"2px 3px 10px 0 rgba(0, 0, 0, 0.18)"
  },
  cardheader:{
    display:"flex",
    justifyContent:"space-between"
  },
  cardheading:{
    fontSize:"1rem"
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
  }
}));