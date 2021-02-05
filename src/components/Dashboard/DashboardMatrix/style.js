import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  Rectangle:{
    width: "-webkit-fill-available",
    boxSizing: "border-box",
    height: "330px",
    margin: "25px 25px 10px",
    padding: "20px 40px 15px",
    boxShadow: "2px 6px 16px 0 rgba(0, 0, 0, 0.04)",
    borderRadius: "8px",
    backgroundColor: "#ffffff"
  },
  CardContainer:{
    display:"flex",
    marginBottom:"15px",
    width:"100%"
  }
}));