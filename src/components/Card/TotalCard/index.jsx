import React from "react";
import {
  Card
} from "@material-ui/core";
import { useStyles } from './style';

const TotalCard = (props) => {
  const classes=useStyles();
  return (
    <Card
      className={classes.Rectangle}
    >
      <div 
      className={classes.TotalLearningPath}
      >{"Total Learning Path"}</div>
      <div  
      className={classes.TotalLearningPathNum}>{"888"}</div>
    </Card>
  );
};

export default TotalCard;
