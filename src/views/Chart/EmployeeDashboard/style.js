import { makeStyles } from "@material-ui/core/styles";
import { DRAWER_WIDTH } from "../../../modules/constants";

const drawerWidth = DRAWER_WIDTH;
export const useStyles = makeStyles((theme) => ({
  pathName: {
    margin: theme.spacing(2),
  },
  courseLabel: {
    color: "#00000",
    float: "right",
    padding: "20px",
  },
  searchField: {
    width: "70%",
    background: "#FFFFFF",
    margin: theme.spacing(2),
  },
  container: {
    width: `calc(100% - ${drawerWidth})`,
    margin: "16px 8px 0px 8px",
  },
  error: {
    color: "#ff0033",
  },
  catalogContainer: {
    background: "#F1F3F7",
    borderRadius: "0.5%",
    width: "100%",
    // margin: "auto"
  },
  pathNameField: {
    background: "#FFFFFF",
  },

  logo: {
    height: 30,
    width: 91.5,
    marginLeft: 50,
  },
  rectangle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // margin: 'auto',
    minWidth: "24%",
    minHeight: theme.spacing(10),
    // padding: '42px 59px 42px 69px',
    borderRadius: "8px",
    boxShadow: `2px 6px 16px 0 rgba(98, 29, 88, 0.08)`,
    backgroundColor: "#ffffff",
    fontSize: "50px",
  },
  rectangle1: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "column",
    margin: "auto",
    minWidth: "24%",
    // minHeight: theme.spacing(10),
    borderRadius: "8px",
    boxShadow: `2px 6px 16px 0 rgba(98, 29, 88, 0.08)`,
    backgroundColor: "#ffffff",
    fontSize: 30,
  },
  text: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  cardValue: {
    fontSize: 28,
  },
  graph: {},
  root: {
    flexGrow: 1,
  },
}));
