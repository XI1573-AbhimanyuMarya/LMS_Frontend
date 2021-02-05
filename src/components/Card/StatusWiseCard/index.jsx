import React from "react";
import { Card } from "@material-ui/core";
import { useStyles } from "./style";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const StatusWiseCard = (props) => {
  const classes = useStyles();
  const { role = "", Completed, Inprogress, Overdue } = props;
  return (
    <div className={classes.gridContainer}>
      <Grid item xs={4}>
        <Card className={classes.ProgressRectangle}>
          <div className={classes.ProgressNum}>{Completed}</div>
          {role != "employee" ? (
            <div className={classes.ProgressPercent}>{"%"}</div>
          ) : (
            <></>
          )}

          <div className={classes.ProgressText}>{"Completed"}</div>
        </Card>
      </Grid>
      <Grid item xs={4}>
        <Card className={classes.ProgressRectangle}>
          <div className={classes.ProgressNum}>{Inprogress}</div>
          {role != "employee" ? (
            <div className={classes.ProgressPercent}>{"%"}</div>
          ) : (
            <></>
          )}
          <div className={classes.ProgressText}>{"In-progress"}</div>
        </Card>
      </Grid>
      <Grid item xs={4}>
        <Card className={classes.ProgressRectangle}>
          <div className={classes.ProgressNum}>{Overdue}</div>
          {role != "employee" ? (
            <div className={classes.ProgressPercent}>{"%"}</div>
          ) : (
            <></>
          )}
          <div className={classes.ProgressText}>{"Overdue"}</div>
        </Card>
      </Grid>
    </div>
  );
};

export default StatusWiseCard;
