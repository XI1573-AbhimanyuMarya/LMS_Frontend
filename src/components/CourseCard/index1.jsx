import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';
import { useStyles } from './style';
import BarIcon from '../SignalIcon';
import ProgressBar from '../ProgressBar';

const CourseCard = (props) => {
  const classes = useStyles();
  const { course, onButtonClick, showButton } = props;
  course.progress = '';
  let btnlabel = "Let's begin"
  if (course?.progress) {
    btnlabel = "Explore"
  }

  let darkBar = 0;
  if (course?.competency?.name === "Beginner") {
    darkBar = 1;
  } else if (course?.competency?.name === "Intermediate") {
    darkBar = 2
  } else if (course?.competency?.name === "Expert") {
    darkBar = 3
  }

  return (

   <Card className={classes.root} >
<CardContent>
        <Grid container spacing={2} alignContent="space-between" className={classes.header}>
          <Grid item xs >
            <Box component="span" className={classes.courseType}>
              {course.category.name}
            </Box>
          </Grid>
          <Grid item container xs className={classes.compatency} >
            <Grid item xs>
              <Box className={classes.bar}>
                <BarIcon darkBar={darkBar} />
              </Box >
            </Grid>
            <Grid item xs>
              <Typography component="span" className={classes.courseLevel}>
                {course?.competency?.name}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Typography variant="body1" component="h5" className={classes.courseTitle}>
            {course.name}
          </Typography>
        </Grid>
        {
          course.progress ?
            <Grid container spacing={2} className={course.progress ? classes.displayNone : ''}>
              <Grid item xs>
                <ProgressBar progress={course.progress ? course.progress : 0} />
              </Grid>
            </Grid>
            :
            ''
        }

        <Grid container spacing={2}>
          <Grid item xs>
            <Typography variant="body2" color="textSecondary" component="p" className={classes.courseDesc}>
              {course.description}
            </Typography>
          </Grid>
        </Grid>

      </CardContent>
      {
        showButton ?
          <CardActions className={classes.action}>
            <Button size="large" className={classes.btn} onClick={onButtonClick}>{btnlabel}</Button>
          </CardActions>
          : ''
      }
      </Card>
  );
}


export default CourseCard;

