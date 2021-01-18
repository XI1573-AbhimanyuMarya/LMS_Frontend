import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  courseDesc: {
    fontSize: 12,
    color: "#858585",

    textAlign: "justify",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    "-webkit-line-clamp": "3",
    "-webkit-box-orient": "vertical",
    [theme.breakpoints.up("md")]: {
      fontSize: 10,
      color: "#858585",
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: 12,
      color: "#858585",
    },
  },

  Beginner: {
    width: "80px",
    marginRight: "-5px",
    marginBottom: "10px",
    height: "38px",
  },
  Intermediate: {
    width: "100px",
    marginRight: "-5px",
    marginBottom: "10px",
    height: "38px",
  },
  Advance: {
    width: "80px",
    marginRight: "-5px",
    marginBottom: "10px",
    height: "38px",
  },
  Expert: {
    width: "80px",
    marginRight: "-5px",
    marginBottom: "10px",
    height: "38px",
  },
  cardheader: {
    display: "flex",
    justifyContent: "space-between",
  },

  cardcontent: {
    height: "150px",
    overflow: "auto",
    [theme.breakpoints.between("sm", "md")]: {
      height: "150px",
    },
  },
  btn: {
    borderRadius: "8px",
    border: "solid 1px #f07301",
    backgroundColor: "#ffffff",
    width: "100%",
    fontSize: "16px",
    fontWeight: 500,
    textAlign: "center",
    color: "#f07402",
    marginTop: "auto",
    [theme.breakpoints.up("md")]: {
      borderRadius: "8px",
      border: "solid 1px #f07301",
      backgroundColor: "white",
      width: "100%",
      height: "70%",
      fontSize: "13px",
      fontWeight: 500,
      textAlign: "center",
      color: "#f07402",
      // marginTop: "auto",
    },
    [theme.breakpoints.up("lg")]: {
      borderRadius: "8px",
      border: "solid 1px #f07301",
      backgroundColor: "white",
      width: "100%",
      fontSize: "16px",
      fontWeight: 500,
      textAlign: "center",
      color: "#f07402",
      marginTop: "auto",
    },
  },
}));
