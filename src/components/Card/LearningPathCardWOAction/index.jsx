import React from 'react';
import {Card,CardContent,CardActionArea} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { SHOW_LEVELS } from '../../../modules/constants';
import { useStyles } from './style';

const LearningPathCardWOAction = (props) => {
  const classes=useStyles();
  return (
    <>
    <Card className={classes.CardRoot}>
      <div style={{display:"flex"}}>
        <div className={classes.CardHeading}>
          {props.heading}
        </div>
        <img src={SHOW_LEVELS[`${props.levelId}-${props.levelName}`]} className={classes[`${props.levelName}`]}/>
      </div>
      <div className={classes.CardDesc}>
        {props.desc}
      </div>  
    </Card>
    
    </>
  );
}

export default LearningPathCardWOAction;