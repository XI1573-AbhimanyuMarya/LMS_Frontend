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
  row1: {
    width:"220px",
    fontWeight:"500",
    fontfamily: 'Roboto',
  },
  row2: {
    width:"150px",
    fontWeight:"500",
    fontfamily: 'Roboto',
    margin: "0 20px 0 0"
  },
  row3: {
    width:"160px",
    fontWeight:"500",
    fontfamily: 'Roboto',
    color:"#621d58",
  },
  row4: {
    width:"120px",
    fontWeight:"500",
    fontfamily: 'Roboto',
  },
  row5: {
    width:"120px",
    fontWeight:"500",
    fontfamily: 'Roboto',
    
  },
  row6: {
    width:"68px",
    display:"flex",
    border:"1px solid #c2c2c2",
    justifyContent:"center",
    margin:"0 50px 0 0",
    color:"#007aff",
    borderRadius:"4px",
    fontfamily: 'Roboto',

  },
  row7: {
   width:"100px",
    display:"flex",
    border:"1px solid #f07301",
    justifyContent:"center",
    color:"#f07402",
    fontWeight:"500",
    borderRadius:"4px",
    fontfamily: 'Roboto',
    
  },
  levIcons: {
    width: 80,
    objectFit: "contain"
  },
  Beginner: {
    width: 80,
    height:48
  },
  Intermediate: {
    width: 100,
    height:48
  },
  Advance: {
    width: 80,
    height:48
  },
  Expert: {
    width: 80,
    height:48
  },
  tblrow:{
    '& td':{
      padding:"5px 31px",
      fontSize:"12px"
    }
  },
  avglearningrate:{
    color:"#007aff" ,
    backgroundColor: "#ffffff",
    fontSize:"10px",
    padding: "5px 20px"
  },
  actionbtn:{
    borderColor:"#f07402",
    color:"#f07402" ,
    backgroundColor: "#ffffff",
    fontSize:"9px",
    padding: "5px 20px"
  }
}));
