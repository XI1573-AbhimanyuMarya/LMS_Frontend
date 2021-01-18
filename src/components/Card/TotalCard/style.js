import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  Rectangle:{
    width: "calc((16vw) - 16px)",//"200px",//"263px",
    height: "100px",//"150px",
    textAlign: "center",
    boxShadow: "4px 5px 10px 0 rgba(0, 0, 0, 0.08)",
    borderRadius: "8px",
    padding: "11.6px 0px 14.6px",//"23.6px 33px 14.6px"
  },
  TotalLearningPath:{
    width: "197px",
    height: "29px",
    margin: "0 0 8.7px",
    fontSize: "18px",//"22px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.32",
    letterSpacing: "normal",
    textAlign: "center",
    color: "#000000"
  },
  TotalLearningPathNum:{
    width: "145px",
    height: "74px",
    margin: "8.7px 26px 0 26px",
    fontSize: "35px",//"56px",
    fontWeight: "500",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.32",
    letterSpacing: "normal",
    textAlign: "center",
    color: "#621d58"
  }
}));