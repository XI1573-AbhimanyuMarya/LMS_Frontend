import React from 'react';
import { Card, CardContent, CardActionArea, Box } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { SHOW_LEVELS } from '../../../modules/constants';
import { useStyles } from './style';
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";

const LearningPathCardWOAction = (props) => {
  const classes = useStyles();
  return (
    <>
      <Card className={classes.CardRoot}>
        <CardContent>
          <div style={{ display: "flex" }}>
            <div className={classes.CardHeading}>
              {props.heading}
            </div>
            <img src={SHOW_LEVELS[`${props.levelId}-${props.levelName}`]} className={classes[`${props.levelName}`]} />
          </div>
          <div className={classes.CardDesc}>
            {props.desc}
          </div>
        </CardContent>
        {props.showViewButton ?
          <CardActions className={classes.action}>
            <Box className={classes.btn} onClick={props.onButtonClick}>
              View
        </Box>
          </CardActions> : <></>}

      </Card>

    </>
  );
}

export default LearningPathCardWOAction;