import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  Rectangle:{
    width: "calc((100vw - 26%) - 16px)",//"1050px",
    height: "330px",//"360px",
    margin: "0 20px 10px",
    padding: "20px 40px 15px",
    borderRadius: "8px",
    boxShadow: "2px 6px 16px 0 rgba(0, 0, 0, 0.04)",
    backgroundColor: "#ffffff"
  },
  CardContainer:{display:"flex",marginBottom:"15px",width:"calc((100vw - 40%) - 16px)"}
}));