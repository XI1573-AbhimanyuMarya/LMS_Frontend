import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  Rectangle:{
    width: "calc((16vw) - 1px)",
    height: "100px",
    textAlign: "center",
    boxShadow: "4px 5px 10px 0 rgba(0, 0, 0, 0.08)",
    borderRadius: "8px",
    padding: "10px",
  },
  TotalLearningPath: {
    fontSize: "16px",
    textAlign: "center",
    color: "#000000",
  },
  TotalLearningPathNum: {
    fontSize: "30px",
    fontWeight: "500",
    textAlign: "center",
    color: "#621d58",
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));
