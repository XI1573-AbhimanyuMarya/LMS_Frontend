import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  MainRectangle: {
    width: "calc((55vw) - 16px)",//"740px",//"1077px",
    height: "100px",//"150px",
    margin: "0 0 0 20px",
    padding: "0 20px 0 20px", //"0 93px 0 70px",
    borderRadius: "8px",
    boxShadow: "2px 6px 16px 0 rgba(0, 0, 0, 0.08)",
    backgroundColor: "#ffffff",
    display:"flex",
    alignItems:"center",
    wordWrap: "break-word"
  },
  CompletedNum: {
    width: "50px", //"64px",
    height: "56px", //"74px",
    margin: "0 4.5px 0 0",
    fontSize: "40px", //"56px",
    fontWeight: "500",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.32",
    letterSpacing: "normal",
    textAlign: "center",
    color: "#3c8200",
  },
  CompletedPercent: {
    width: "16px",
    height: "48px",
    margin: "24px 18.5px 2px 4.5px",
    fontSize: "26px", //"36px",
    fontWeight: "500",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.33",
    letterSpacing: "normal",
    textAlign: "center",
    color: "#3c8200",
  },
  CompletedText: {
    width: "107px",
    height: "29px",
    margin: "31px 0 14px 18.5px",
    opacity: "0.5",
    fontFamily: "Roboto",
    fontSize: "18px", //"22px",
    fontWeight: "500",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.32",
    letterSpacing: "normal",
    textAlign: "left",
    color: "#000000",
  },
  ProgressRectangle: {
    width: "100%",
    height: "100px",
    margin: "0 15px", //"0 69px",
    // padding: "45px 20px 0 20px", //"26px 62px 50px 69px",
    borderRadius: "8px",
    boxShadow: "2px 6px 16px 0 rgba(98, 29, 88, 0.08)",
    backgroundColor: "#ffffff",
    display: "flex",
  },
  ProgressNum: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    // width: "50px", //"64px",
    // height: "56px", //"74px",
    // margin: "0 4.5px 0 0",
    fontFamily: "Roboto",
    fontSize: "40px", //"56px",
    fontWeight: "500",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.32",
    letterSpacing: "normal",
    textAlign: "center",
    color: "#f9b900",
  },
  ProgressPercent: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    width: "16px", //"26px",
    height: "48px",
    margin: "14px 20.5px 2px 4.5px", // "24px 20.5px 2px 4.5px",
    fontFamily: "Roboto",
    fontSize: "26px", //"36px",
    fontWeight: "500",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.33",
    letterSpacing: "normal",
    textAlign: "center",
    color: "#f9b900",
  },
  ProgressText: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    width: "100%", //"113px",
    height: "29px",
    margin: "23px 0 14px 18.5px", //"31px 0 14px 20.5px",
    opacity: "0.5",
    fontFamily: "Roboto",
    fontSize: "18px",
    fontWeight: "500",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.32",
    letterSpacing: "normal",
    textAlign: "left",
    color: "#000000",
  },
  OverdueNum: {
    width: "50px", //"64px",
    height: "56px", //"74px",
    margin: "0 4.5px 0 0",
    fontFamily: "Roboto",
    fontSize: "40px", //56px",
    fontWeight: "500",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.32",
    letterSpacing: "normal",
    textAlign: "center",
    color: "#e76600",
  },
  OverduePercent: {
    width: "16px", //"26px",
    height: "48px",
    margin: "24px 18.5px 2px 4.5px", //"24px 20.5px 2px 4.5px",
    fontFamily: "Roboto",
    fontSize: "26px", //"36px",
    fontWeight: "500",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.33",
    letterSpacing: "normal",
    textAlign: "center",
    color: "#e76600",
  },
  OverdueText: {
    width: "82px",
    height: "29px",
    margin: "31px 0 14px 18.5px",
    opacity: "0.5",
    fontFamily: "Roboto",
    fontSize: "18px", //"22px",
    fontWeight: "500",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.32",
    letterSpacing: "normal",
    textAlign: "left",
    color: "#000000",
  },
  // paper: {
  //   padding: theme.spacing(2),
  //   textAlign: "center",
  //   color: theme.palette.text.secondary,
  // },
}));
