import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  gridRoot: {
    marginTop: 20,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  mainContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "auto",
    position: "absolute",
    top: "0%",
    left: "42%",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: "linear-gradient(180deg, #FFAB39 0%, #F07200 100%)",
    color: "#FFFFFF",
    textTransform: "capitalize",
    lineHeight: "2.4",
    fontSize: "1.2em",
  },
  navSubmit: {
    margin: theme.spacing(0, 2, 0),
    background: "linear-gradient(180deg, #FFAB39 0%, #F07200 100%)",
    color: "#FFFFFF",
    textTransform: "capitalize",
    padding: "0px 16px",
    fontSize: 12,
  },

  employeeViewText: {
    color: "#858585",
    textAlign: "-webkit-center",
  },
  media: {
    height: 40,
    width: 38,
  },
  logo: {
    height: 30,
    width: 91.5,
    marginLeft: 50,
  },
  error: {
    color: "#ff0033",
    textAlign: "center",
  },
  dashboardContent: {
    color: "#858585",
  },
  button: {
    marginRight: 20,
    textTransform: "capitalize",
  },
  dashboardBtn: {
    marginRight: 20,
    textTransform: "capitalize",
    background: "#621D58",
    color: "#FFFFFF",
  },
  approvalBtn: {
    textTransform: "capitalize",
    opacity: 0.3,
  },
  dashboardIcon: {
    height: 20,
    width: 20,
  },
  learningPathIcon: {
    height: 25,
    width: 20,
  },
}));
