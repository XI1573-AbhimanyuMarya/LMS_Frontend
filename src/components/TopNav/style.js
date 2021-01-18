import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
 
  notification_tray:{
    width: "470px",
    height: "1080px",
    padding: "25px 20px 382px",
    backgroundImage: "linear-gradient(to bottom, #ffffff 0%, #ffffff 0%, #f8f9fb 10%, #f1f3f7 14%, #f1f3f7 14%)",
  },
  notification_tray_header:{
    width: "84px",
    height: "21px",
    margin: "0px 0px 20px 4px",
    fontFamily: "Roboto",
    fontSize: "16px",
    fontWeight: "500",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.31",
    letterSpacing: "normal",
    textAlign: "center",
    color: "#545454"
  },
  notification_box:{
    width: "430px",
    height: "115px",
    margin: "0 0 30px",
    padding: "12px 13px 15px 25px",
    borderRadius: "8px",
    boxShadow: "1px 3px 9px 0 rgba(0, 0, 0, 0.1)",
    backgroundColor: "#ffffff"
  },
  notification_icon:{
    width: "54px",
    height: "53px",
    margin: "14px 14px 0px 0px",
    objectFit: "contain"
  },
  notification_header:{
    width: "300px",
    height: "19px",
    fontFamily: "Roboto",
    fontSize: "14px",
    fontWeight: "500",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.36",
    letterSpacing: "normal",
    textAlign: "left",
    color: "#545454"
  },
  notification_desc:{
    width: "318px",
    height: "25px",
    fontFamily: "Roboto",
    fontSize: "11px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.36",
    letterSpacing: "normal",
    textAlign: "left",
    color: "#545454"
   },
   notification_view:{
    width: "175px",
    height: "35px",
    padding: "7px 54.5px 12px",
    borderRadius: "8px",
    boxShadow: "1px 4px 10px 0 rgba(0, 0, 0, 0.08)",
    backgroundColor: "#ffffff"
    },
    notification_info:{
      verticalAlign: "top"
    },
    notification_btn_text:{
      width: "66px",
      height: "6px",
      fontFamily: "Roboto",
      fontSize: "10px",
      fontWeight: "500",
      fontStretch: "normal",
      fontStyle: "normal",
      lineHeight: "1.33",
      letterSpacing: "normal",
      textAlign: "center",
      color: "#f07402"
    }
}));