import React from "react";
import { Card } from "@material-ui/core";
import { useStyles } from "./style";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
const TotalCard = (props) => {
  const classes = useStyles();
  const { heading, Total } = props;
  return (
    <Grid item xs={3}>
      <Card className={classes.Rectangle}>
        <div className={classes.TotalLearningPath}>Assign Learning Path</div>
        <div className={classes.TotalLearningPathNum}>{Total}</div>
      </Card>
    </Grid>
  );
};

export default TotalCard;