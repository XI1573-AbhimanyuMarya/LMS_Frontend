import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
export const useStyles = makeStyles((theme) => ({
  root: {
    margin: "3px 3px 15px",
    borderRadius: "8px",
    boxShadow: "2px 4px 10px 0 rgba(0, 0, 0, 0.1)",
    minWidth: "340px",
    backgroundColor: "#ffffff",
    [theme.breakpoints.up("md")]: {
      // backgroundColor:"pink",
    },
    [theme.breakpoints.up("lg")]: {
      // backgroundColor:"blue",
    },
  },
  delete: {
    marginTop: "-42px",
    marginLeft: "56px",
    fontSize: ".5rem",
    [theme.breakpoints.up("md")]: {
      marginTop: "-42px",
      marginLeft: "56px",
      fontSize: ".3rem",
    },
    [theme.breakpoints.up("lg")]: {
      marginTop: "-42px",
      marginLeft: "56px",
      fontSize: ".5rem",
    },
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
    "&:not(:first-child)": {
      marginLeft: "auto",
    },
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  cardActions: {
    padding: "0px",
    paddingLeft: "15px",
    margin: "-8px 0 0 0",
    backgroundColor: " #f6f8ff",
  },
  deleteIcon: {
    width: "14px",
    height: "14px",
    color: "#ff2600",
    [theme.breakpoints.up("md")]: {
      width: "12px",
      height: "12px",
      color: "#ff2600",
    },
    [theme.breakpoints.up("lg")]: {
      width: "14px",
      height: "14px",
      color: "#ff2600",
    },
  },
  editIcon: {
    width: "14px",
    height: "14px",
    color: "#027aff",
    [theme.breakpoints.up("md")]: {
      width: "12px",
      height: "12px",
      color: "#027aff",
    },
    [theme.breakpoints.up("lg")]: {
      width: "14px",
      height: "14px",
      color: "#027aff",
    },
  },
  learningPath: {
    backgroundColor: " #f6f8ff",
    fontSize: "14px",
    marginTop: "-2px",
    padding: " 1px 16px 6px",
    "&:last-child": {
      paddingBottom: "8px",
    },
  },
  pathTitle: {
    fontSize: "10px",
    color: "#888888",
    [theme.breakpoints.up("md")]: {
      fontSize: "9px",
      color: "#888888",
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "10px",
      color: "#888888",
    },
  },
  listData: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "10px",
  },
  listData1: {
    // display: "flex",
    justifyContent: "space-between",
    fontSize: "10px",
  },
  deleteButton: {
    paddingRight: "4px",
    color: "red",
    fontWeight: "600",
    cursor: "pointer",
  },
  courseName: {
    color: " #282828",
    width: "39%",
  },
  courseName1: {
    color: " #282828",
    width: "39%",
    
  },
  courseStatus: {
    color: "#a5a5a5",
    width: "39%",
  },
  courseStatus1: {
    color: "#a5a5a5",
    width: "100%",
    backgroundColor:"#f6f8ff"
  },
  percent: {
    width: "22px",
    height: "11px",
    fontFamily: "ProximaNova",
    fontSize: "11px",
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.22,
    letterSpacing: "normal",
    textAlign: "left",
    color: "#feaa38",
  },
  search: {
    fontWeight: 700,
  },
}));
