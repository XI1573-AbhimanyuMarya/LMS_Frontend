import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = "18%";

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
  content: {
    flexGrow: 1,
    // padding: theme.spacing(2),
  },
  title: {
    display: "block",
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  imgXebia: {
    width: 90,
    height: 25,
    marginRight: theme.spacing(2),
  },
  notification: {
    width: 35,
    height: 24,
    color: "#999999",
  },
  navIcons: {
    width: 25,
    height: 25,
    objectFit: "contain",
  },
  MuiListItemIcon: {
    minWidth: 28,
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
  navLinks: {
    marginTop: theme.spacing(5),
    "& a": {
      textDecoration: "none",
      color: "#a1a1a1",
    },
  },
  main: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    flexGrow: 1,
    backgroundColor: "#f7f8fc",
  },
}));
