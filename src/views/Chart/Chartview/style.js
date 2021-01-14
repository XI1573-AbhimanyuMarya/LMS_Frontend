import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  left: {
    width: "15px",
    backgroundColor: "white",
    borderRadius: "15px",
    margin: "0 0 200px 2147px",
  },
  right: {
    margin: "0px 0px 200px -74px",
    width: "15px",
    backgroundColor: "white",
    borderRadius: "15px",
  },
  CardRoot: {
    width: "255px", //"340px",
    height: "150px",
    margin: "8.5px 10px 0 0.5px",
    padding: "10px", //"12px 20px",
    borderRadius: "8px",
    backgroundColor: "#ffffff",
    border: "none",
    boxShadow: "none",
  },
}));
