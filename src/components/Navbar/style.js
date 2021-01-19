import { makeStyles } from "@material-ui/core/styles";
import { DRAWER_WIDTH } from "../../modules/constants";

const drawerWidth = DRAWER_WIDTH;

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  grow: {
    flexGrow: 1,
  },
  appBar: {
    width: `calc(100% - ${drawerWidth})`,
    marginLeft: drawerWidth,
    backgroundColor: "#ffffff",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  navIcons: {
    width: 20,
    height: 30,
    objectFit: "contain",
    [theme.breakpoints.up("md")]: {
      width: 22,
    },
    [theme.breakpoints.up("xl")]: {
      width: 25,
    },
  },
  MuiListItemIcon: {
    minWidth: 28,
    margin: "0px 7px 0px 0px",
  },
  userIcon: {
    marginTop: theme.spacing(2),
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  name: {
    marginTop: theme.spacing(2),
  },
  designation: {
    // margin: theme.spacing(2),
    color: "#a1a1a1",
  },
  navList: {
    marginTop: theme.spacing(3),
  },
  navLinks: {
    marginTop: theme.spacing(1),
    "& a": {
      textDecoration: "none",
      color: "#a8adc2",
    },
  },
  linkItem: {
    "& span ": {
      fontSize: 12,
      [theme.breakpoints.up("md")]: {
        fontSize: 14,
      },
      [theme.breakpoints.up("xl")]: {
        fontSize: 16,
      },
    },
  },
  disableLink: {
    display: "none",
  },
  hideLink: {
    display: "none",
  },

  active: {
    "& a": {
      color: "#621d58",
    },
  },
}));
