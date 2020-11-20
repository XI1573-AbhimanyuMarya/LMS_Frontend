import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    marginTop: "30px",
  },
  searchField: {
    width: "100%",
  },
  paper: {
    padding: theme.spacing(4),
    display: "flex",
    flexDirection: "row",
  },
  heading: {
    marginLeft: "45px",
    marginBottom: "-30px",
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
