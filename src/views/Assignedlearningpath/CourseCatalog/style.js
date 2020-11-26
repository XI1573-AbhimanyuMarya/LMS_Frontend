import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    borderRadius: "8px",
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up('md')]: {
      // backgroundColor: "lightpink",
    },
    [theme.breakpoints.up('lg')]: {
      // backgroundColor: "blue",
    },
  },
  header: {
    // margin: "10px 0px",
    marginLeft: "-15px",
    [theme.breakpoints.up('md')]: {
      // margin: "10px 0px",
    marginLeft: "-15px",
    },
    [theme.breakpoints.up('lg')]: {
      margin: "10px 0px",
    marginLeft: "-15px",
    },
  },
  compatency: {
    textAlign: "center",
    [theme.breakpoints.up('md')]: {
      margin:"0 -16px 0 0"
    },
    [theme.breakpoints.up('lg')]: {
      // margin:"0 -16px 0 0"
    },
  },
  courseType: {
    textTransform: 'capitalize',
    fontSize: 14,
    fontWeight: "normal",
    padding: "10px",
    borderRadius: 13,
    color: '#4a90e2',
    border: '1px solid #4a90e2',
    [theme.breakpoints.up('md')]: {
      textTransform: 'capitalize',
      fontSize: 11,
      fontWeight: "normal",
      padding: "5px",
      borderRadius: 13,
      color: '#4a90e2',
      border: '1px solid #4a90e2',
    },
    [theme.breakpoints.up('lg')]: {
      textTransform: 'capitalize',
    fontSize: 11,
    fontWeight: "normal",
    padding: "10px",
    borderRadius: 13,
    color: '#4a90e2',
    border: '1px solid #4a90e2',
    },
  },
  courseLevel: {
    fontSize: 18,
    fontWeight: "normal",
    color: '#858585',
    [theme.breakpoints.up('md')]: {
      fontSize: 11,
      fontWeight: "normal",
      color: '#858585',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: 13,
    fontWeight: "normal",
    color: '#858585',
    },
  },
  courseTitle: {
    fontSize: "22px",
    padding: "10px 0px",
    color: "#000000",
    [theme.breakpoints.up('md')]: {
      fontSize: "13px",
    // padding: "10px 0px",
    color: "#000000",
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: "15px",
    padding: "10px 0px",
    color: "#000000",
    },
  },
  courseDesc: {
    fontSize: 12,
    padding: "10px 0px",
    color: '#858585',
    [theme.breakpoints.up('md')]: {
      fontSize: 11,
      padding: "5px 0px",
      color: '#858585',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: 11,
      padding: "5px 0px",
      color: '#858585',
    },
  },
  displayNone: {
    display: "none"
  },
  action:{
    marginTop: "auto"
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
    [theme.breakpoints.up('md')]: {
      backgroundColor: "lightpink",
    },
    [theme.breakpoints.up('lg')]: {
      backgroundColor: "blue",
    },
  }
}));
