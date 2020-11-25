import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "column",
    borderRadius: 4

  },
  header: {
    margin: "10px 0px",
    marginLeft: "-15px"
  },
  compatency: {
    textAlign: "center",
  },
  courseType: {
    textTransform: 'capitalize',
    fontSize: 14,
    fontWeight: "normal",
    padding: "10px",
    borderRadius: 13,
    color: '#4a90e2',
    border: '1px solid #4a90e2',
  },
  courseLevel: {
    fontSize: 18,
    fontWeight: "normal",
    color: '#858585'
  },
  courseTitle: {
    fontSize: "16px",
    padding: "10px 0px",
    color: "#000000"
  },
  courseDesc: {
    fontSize: 12,
    padding: "10px 0px",
    color: '#858585'
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
    marginTop: "auto"
  }
}));
