import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    marginTop: "30px",
    [theme.breakpoints.up('md')]: {
      display: "flex",
    marginTop: "30px",
    },
    [theme.breakpoints.up('lg')]: {
      display: "flex",
    marginTop: "30px",
    },
    
  },
  toolbar: theme.mixins.toolbar,
  searchField: {
    width: " 610px",
    marginRight: "235px",
    [theme.breakpoints.up('md')]: {
      width: " 510px",
    marginRight: "235px",
    },
    [theme.breakpoints.up('lg')]: {
      width: " 610px",
    marginRight: "235px",
    },
  },
  paper: {
    padding: "16px 0 16px 10px",
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#f7f8fc",
  },
  heading: {
    marginRight: "67%",
    color: "#621d58",
    fontSize: "22px",
    [theme.breakpoints.up('md')]: {
      marginRight: "70%",
    color: "#621d58",
    fontSize: "16px",
    },
    [theme.breakpoints.up('lg')]: {
      marginRight: "67%",
    color: "#621d58",
    fontSize: "22px",
    },
  },
  cardData: {
    display: "flex",
    flexDirection:"column",
    flexFlow: "row wrap",
    // paddingTop: "24px",
    //paddingBottom: "24px",
    height: "65vh",
    overflow: "auto",
    margin:"2.5% 2.5%",
    [theme.breakpoints.up('md')]: {
      display: "flex",
      flexFlow: "row wrap",
      // paddingTop: "24px",
      flexDirection:"column",
      //paddingBottom: "24px",
      height: "75vh",
      overflow: "auto",
    },
    [theme.breakpoints.up('lg')]: {
      display: "flex",
    flexFlow: "row wrap",
    // paddingTop: "24px",
    flexDirection:"column",
    //paddingBottom: "24px",
    height: "75vh",
    overflow: "auto",
    overflowX: "hidden"
    },
  },
  search:{
    [theme.breakpoints.up('md')]: {
      padding:"0 !important"
    },
    [theme.breakpoints.up('lg')]: {
      padding:"0 !important"
    },
  }
}));
