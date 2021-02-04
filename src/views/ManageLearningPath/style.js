import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  mainContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    margin: "80px auto",
  },
  cardContainer: {
    display: "flex",
    flexWrap: "wrap",
    height: "67vh",
    overflow: "auto",
  },
  root: {
    width: "300px",
    height: "183px",
    borderRadius: "8px",
    boxShadow: "2px 3px 10px 0 rgba(0, 0, 0, 0.18)",
  },
  cardheader: {
    display: "flex",
    justifyContent: "space-between",
  },
  cardheading: {
    fontSize: "1rem",
    margin: "0 0 0 15px",
  },
  Beginner: {
    width: "80px",
    marginBottom: "10px",
    height: "25px",
  },
  Intermediate: {
    width: "80px",
    marginBottom: "10px",
    height: "25px",
  },
  Advance: {
    width: "80px",
    marginBottom: "10px",
    height: "25px",
  },
  Expert: {
    width: "80px",
    marginBottom: "10px",
    height: "25px",
  },
  carddesc: {
    textAlign: "justify",
    fontSize: "11px",
    minHeight: "55px",
  },
  cardfooter: {
    backgroundColor: "#f5f5f5",
    padding: "10px 16px",
    display: "flex",
    marginTop: "3px",
    justifyContent: "space-between",
  },
  cardfootertext: {
    fontSize: "0.70rem",
  },
  cardfooterbtn: {
    backgroundColor: "white",
    borderRadius: "21px",
    width: "55px",
  },
  checkIcon: {
    color: "#67B104",
    float: "right",
  },
  spanNumber: {
    border: "solid 1px rgba(98, 29, 88, 0.2)",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    padding: "2px 13px",
    marginLeft: "7px",
    color: "#621d58",
  },
  loader: {
    position: "absolute",
    transform: "translate(-50%, -50%)",
    top: "50%",
    left: "50%",
    color: "inherit",
  },
  deleteButton: {
    padding: "18px 20px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#ff7119",
    color: "#ffffff",
    fontSize: "14px",
    width: "216px",
    height: "-webkit-fill-available",
    cursor: "pointer",

    "&:disabled": {
      opacity: "0.8",
      cursor: "not-allowed",
    },
  },
  deleteIcon: {
    backgroundColor: "#ffffff",
    borderRadius: "100%",
    padding: "3px 6px",
    color: "#ff7119",
    marginLeft: "10px",
  },
  headerContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    // marginBottom: "25px",
  },
  searchField: {
    width: "70%",
    background: "#FFFFFF",
    margin: "2px",
    marginBottom: "15px",
  },
}));
