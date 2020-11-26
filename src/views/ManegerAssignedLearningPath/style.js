import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    marginTop: "30px",
  },
  toolbar: theme.mixins.toolbar,
  searchField: {
    width: " 610px",
    marginRight: "235px",
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
  },
  cardData: {
    display: "flex",
    flexFlow: "row wrap",
    // paddingTop: "24px",
    paddingBottom: "24px",
    height: "65vh",
    overflow: "auto",
  },
}));
