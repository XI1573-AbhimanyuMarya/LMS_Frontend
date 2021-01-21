import React from "react";
import { Card } from "@material-ui/core";
import { useStyles } from "./style";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const StatusWiseCard = (props) => {
  const classes = useStyles();
  const { role = "", Completed, Inprogress, Overdue } = props;
  return (
    <>
      <Grid item xs={3}>
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
      <Grid item xs={3}>
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
      <Grid item xs={3}>
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
    </>
    // <Card className={classes.MainRectangle}>
    //   <div className={classes.CompletedNum}>{Completed}</div>
    //   <div className={classes.CompletedPercent}>{"%"}</div>
    //   <div className={classes.CompletedText}>{"Completed"}</div>
    //   <Card className={classes.ProgressRectangle}>
    //     <div className={classes.ProgressNum}>{Inprogress}</div>
    //     <div className={classes.ProgressPercent}>{"%"}</div>
    //     <div className={classes.ProgressText}>{"In-progress"}</div>
    //   </Card>
    //   <div className={classes.OverdueNum}>{Overdue}</div>
    //   <div className={classes.OverduePercent}>{"%"}</div>
    //   <div className={classes.OverdueText}>{"Overdue"}</div>
    // </Card>
  );
};

export default StatusWiseCard;
