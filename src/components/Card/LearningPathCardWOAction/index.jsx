import React from 'react';
import { Card } from '@material-ui/core';
import { SHOW_LEVELS } from '../../../modules/constants';
import { useStyles } from './style';

const LearningPathCardWOAction = (props) => {
  const classes=useStyles();
  return (
    <>
      <Card className={classes.CardRoot}>
        <div className={classes.CardInner}>
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