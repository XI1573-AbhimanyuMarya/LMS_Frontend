import React from "react";
import {
  Card
} from "@material-ui/core";
import { useStyles } from './style';

const TotalCard = (props) => {
  const classes=useStyles();
  const {heading,Total}=props;
  return (
    <Card
      className={classes.Rectangle}
    >
      <div 
      className={classes.TotalLearningPath}
      >{heading}</div>
      <div  
      className={classes.TotalLearningPathNum}>{Total}</div>
    </Card>
  );
};

export default TotalCard;
