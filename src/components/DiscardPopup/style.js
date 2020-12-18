import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  discardButton: {
    background: "linear-gradient(180deg, #FFAB39 0%, #F07200 100%)",
    color: "#FFFFFF",
    textTransform: "capitalize",
    fontSize: 15,
    fontWeight: 500,
  },
  cancelButton: {
    textTransform: "capitalize",
    border: "2px solid #858585",
    color: "#858585",
    fontSize: 15,
    fontWeight: 500,
  },
  dailogTitle: {
    color: "#621D58",
  },
  approve: {
    width: "426px",
    height: "333px",
    borderRadius: "20px",
    boxShadow: "0 4px 12px 0 rgba(0, 0, 0, 0.08)",
    backgroundColor: "#ffffff",
  },
  discardButtonapprove: {
    width: "150px",
    height: "44px",
    borderRadius: "8px",
    border: "3px solid #4d88f4",
    color: "#4d88f4",
    fontSize: "18px",
    boxShadow: "0 4px 12px 0 rgba(0, 0, 0, 0.08)",
    margin:"0 0 20px 0"
  },
  check:{
    fontSize:"85px",
    color:"#28ad00"
  },
  content:{
    display:"flex",
    alignItems:"center",
    flexDirection:"column"
  },
  checkapprove:{
    width: "111px",
    height: "30px",
    fontFamily: "ProximaNova",
    fontSize: "25px",
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.2,
    letterSpacing: "normal",
    textAlign: "left",
    color: "#28ad00"
  },
  text:{
    width: "380px",
    height: "55px",
    margin: "12px 0 25px",
    borderRadius: "8px",
    boxShadow: "0 4px 12px 0 rgba(0, 0, 0, 0.08)",
    backgroundColor: "#ffffff",
    border:"1px solid white"
  },
  reason:{
    width: "92px",
    height: "17px",
    margin: "8px 272px 12px 0",
    fontFamily: "ProximaNova",
    fontSize: "14px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.21,
    letterSpacing: "normal",
    textAlign: "left",
    color: "#000000"
  },
  discardButtonpop:{
    width: "309px",
    height: "40px",
    margin: "15px 0 0 0",
    borderRadius: "4px",
    backgroundColor: "#0073e6"
  }
}));
