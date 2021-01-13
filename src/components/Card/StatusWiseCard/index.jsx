import React from "react";
import { Card } from "@material-ui/core";
import { useStyles } from "./style";

const StatusWiseCard = (props) => {
  const classes = useStyles();
  const {Completed,Inprogress,Overdue}=props;
  return (
    <Card className={classes.MainRectangle}>
      <div className={classes.CompletedNum}>{Completed}</div>
      <div className={classes.CompletedPercent}>{"%"}</div>
      <div className={classes.CompletedText}>{"Completed"}</div>
      <Card className={classes.ProgressRectangle}>
        <div className={classes.ProgressNum}>{Inprogress}</div>
        <div className={classes.ProgressPercent}>{"%"}</div>
        <div className={classes.ProgressText}>{"In-progress"}</div>
      </Card>
      <div className={classes.OverdueNum}>{Overdue}</div>
      <div className={classes.OverduePercent}>{"%"}</div>
      <div className={classes.OverdueText}>{"Overdue"}</div>
    </Card>
  );
};

export default StatusWiseCard;
