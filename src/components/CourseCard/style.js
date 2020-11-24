import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "column",
    borderRadius: 4,
    [theme.breakpoints.up('md')]: {
      // backgroundColor: "blue",
      width: "100%",
      height: "100%",
      // backgroundColor: "#ffffff",
      display: "flex",
      flexDirection: "column",
      borderRadius: 4,
    },
    [theme.breakpoints.up('lg')]: {
      // backgroundColor: "red",
      width: "100%",
      height: "100%",
      // backgroundColor: "#ffffff",
      display: "flex",
      flexDirection: "column",
      borderRadius: 4,
    },

  },
  header: {
    margin: "-8px 0px 10px 0px",
    marginLeft: "-15px",
    flexWrap: "wrap",
    [theme.breakpoints.up('md')]: {
      // margin: "10px 0px",
      marginLeft: "-15px",
      flexWrap: "wrap",
    }

  },
  compatency: {
    textAlign: "center",
  },
  courseType: {
    textTransform: 'capitalize',
    fontSize: 14,
    fontWeight: "normal",
    padding: "2px 10px 2px 10px",
    borderRadius: 13,
    color: '#4a90e2',
    border: '1px solid #4a90e2',
    [theme.breakpoints.up('md')]: {
      textTransform: 'capitalize',
      fontSize: 10,
      fontWeight: "normal",
      padding: "2px 10px 2px 10px",
      borderRadius: 13,
      // color: 'green',
      border: '1px solid #4a90e2',
      margin:"0 10px 0 0"
    },
    [theme.breakpoints.up('lg')]: {
      textTransform: 'capitalize',
      fontSize: 10,
      fontWeight: "normal",
      padding: "2px 10px 2px 10px",
      borderRadius: 13,
      color: '#4a90e2',
      border: '1px solid #4a90e2',
    }
  },
  courseLevel: {
    fontSize: 18,
    fontWeight: "normal",
    color: '#858585',
    [theme.breakpoints.up('md')]: {
      fontSize: 10,
    fontWeight: "normal",
    color: '#858585',
    margin:"0 -10px 0 0"
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: 14,
    fontWeight: "normal",
    color: '#858585',
    margin: 0
    },
    
  },
  courseTitle: {
    fontSize: "16px",
    padding: "10px 0px",
    color: "#000000",
    [theme.breakpoints.up('md')]: {
      fontSize: "11px",
    padding: "10px 0px",
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
      fontSize: "10px",
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: "12px",
    },
  },
  displayNone: {
    display: "none"
  },
  action:{
    marginTop: "auto",
    [theme.breakpoints.up('md')]: {
      marginTop:"-36px"
    },
    [theme.breakpoints.up('lg')]: {
      marginTop:"-4px"
    }
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
      borderRadius: "8px",
    border: "solid 1px #f07301",
    backgroundColor: "white",
    width: "100%",
    height:"70%",
    fontSize: "13px",
    fontWeight: 500,
    textAlign: "center",
    color: "#f07402",
    // marginTop: "auto",
    },
    [theme.breakpoints.up('lg')]: {
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
