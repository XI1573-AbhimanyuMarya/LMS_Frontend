import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    marginTop: "30px",
    [theme.breakpoints.up("md")]: {
      display: "flex",
      marginTop: "30px",
    },
    [theme.breakpoints.up("lg")]: {
      display: "flex",
      marginTop: "30px",
    },
  },
  toolbar: theme.mixins.toolbar,
  searchField: {
    width: " 610px",
    marginRight: "235px",
    backgroundColor: '#ffffff',
    [theme.breakpoints.up("md")]: {
      width: " 510px",
      marginRight: "235px",
      backgroundColor: '#ffffff',
    },
    [theme.breakpoints.up("lg")]: {
      width: " 610px",
      marginRight: "235px",
      backgroundColor: '#ffffff',
    },
  },
  paper: {
    padding: '20px 0',
    overflow: 'auto',
    height: '58vh',
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#f7f8fc",
    boxShadow: 'none !important',
  },
  heading: {
    color: "#621d58",
    fontSize: "16px",
    marginTop: '20px',
    [theme.breakpoints.up("md")]: {
      color: "#621d58",
      fontSize: "16px",
      marginTop: '20px',
    },
    [theme.breakpoints.up("lg")]: {
      color: "#621d58",
      fontSize: "16px",
      fontWeight: '500',
      marginTop: '20px',
    },
  },
  cardData: {
    display: "flex",
    flexFlow: "row wrap",
    // paddingTop: "24px",
    paddingBottom: "24px",
    height: "65vh",
    overflow: "auto",
    [theme.breakpoints.up("md")]: {
      display: "flex",
      flexFlow: "row wrap",
      // paddingTop: "24px",
      paddingBottom: "24px",
      height: "42vh",
      overflow: "auto",
    },
    [theme.breakpoints.up("lg")]: {
      display: "flex",
      flexFlow: "row wrap",
      // paddingTop: "24px",
      paddingBottom: "24px",
      height: "65vh",
      overflow: "auto",
    },
  },
  assignedContainer: {
    padding: '20px'
  },
  search: {
    [theme.breakpoints.up("md")]: {
      padding: "0 !important",
    },
    [theme.breakpoints.up("lg")]: {
      padding: "0 !important",
    },
  },
}));
