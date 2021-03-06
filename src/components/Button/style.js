import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  savebtn:{
    color:"#67b104",
    backgroundColor:"#ffffff",
    padding:"6px 10px",
    fontSize:"10px"
  },
  uploadbtn:{
    color:"#007aff",
    backgroundColor:"#ffffff",
    padding:"6px 10px",
    fontSize:"10px"
  },
  waitbtn:{
    color:"white",
    backgroundColor:"#ff9300",
    padding:"6px 5px",
    fontSize:"10px",
    fontWeight:"normal",
    textTransform: 'capitalize',
    height: '28px',
    borderRadius: "1px",
    '&:hover': {
      backgroundColor: "#ff9300",
    }
  },
  bckbtn:{
    textTransform:"lowercase",
    opacity:0.7
  },
  viewbtn:{
    borderColor:"#f07402",
    color:"#f07402" ,
    backgroundColor: "#ffffff",
    fontSize:"9px",
    padding: "5px 20px",
    textTransform: 'capitalize'
  },
  avglearningrate:{
    color:"#007aff" ,
    backgroundColor: "#ffffff",
    fontSize:"10px",
    padding: "5px 20px"
  },
  cardfooterbtn:{
    backgroundColor:"white",
    borderRadius:"21px",
    width:"55px"
  },
  arrowfwbtn:{
    height:"10px",paddingLeft:"10px"
  },
  approve: {
    width: "120px",
    height: "50px",
    margin: "5px 0px 5px 34px",
    padding: "5px 30px",
    borderRadius: "4px",
    backgroundImage: "linear-gradient(to bottom, #ffab39, #f07200)",
    display: "flex",
    justifyContent: "center",
    color:"white",
    textTransform: 'capitalize'
  },
  reject: {
    width: "120px",
    height: "50px",
    margin: "5px 30px 5px 40px",
    padding: "5px 30px",
    borderRadius: "4px",
    border: "solid 1px #ef7200",
    backgroundColor: "#ffffff",
    display: "flex",
    justifyContent: "center",
    color:"#ef7200",
    textTransform: 'capitalize'
  },
  completed:{
    color:"#ffffff" ,
    backgroundColor: "#67b104",
    padding: "2px 10px",
    boxShadow: "0 3px 6px 0 rgba(0, 0, 0, 0.16)",
    borderRadius: "1px",
    '&:hover': {
      backgroundColor: "#67b104",
    }
  },
  doneroundedicon:{
    margin: "0px 0px 3px 7px",
    fontSize: "19px",
  }
}));