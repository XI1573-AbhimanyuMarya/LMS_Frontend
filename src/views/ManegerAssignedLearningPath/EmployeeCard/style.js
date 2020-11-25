import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
export const useStyles = makeStyles((theme) => ({
  root: {
    margin: "3px 4px 15px",
    borderRadius: "8px",
    boxShadow: "2px 4px 10px 0 rgba(0, 0, 0, 0.1)",
    backgroundColor: "#ffffff",
  },
  delete: {
    marginTop: "-42px",
    marginLeft: "56px",
    fontSize: ".5rem",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
    "&:not(:first-child)": {
      marginLeft: "auto",
    },
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  cardActions: {
    padding: "0px",
    paddingLeft: "15px",
    margin: "-8px 0 0 0",
    backgroundColor: " #f6f8ff",
  },
  deleteIcon: {
    width: "14px",
    height: "14px",
    color: "#ff2600",
  },
  editIcon: {
    width: "14px",
    height: "14px",
    color: "#027aff",
  },
  learningPath: {
    backgroundColor: " #f6f8ff",
    fontSize: "14px",
    marginTop: "-7px",
    padding: " 1px 16px 6px",
    "&:last-child": {
      paddingBottom: "8px",
    },
  },
  pathTitle: {
    fontSize: "10px",
    color: "#888888",
  },
}));
