import React from 'react';
import { useStyles } from './style';

import { SHOW_LEVELS } from '../../modules/constants';
import {ViewButton,LearningRateButton} from '../Button';

const CourseCard = (props) => {
  const classes = useStyles();
  const { course, onButtonClick, showButton } = props;

  course.progress = '';
  
  return (
    <tr className={classes.tblrow}>
      <td> {course.learningPath.name}</td>
      <td> <img src={SHOW_LEVELS[course.learningPath.competency.id+"-"+course.learningPath.competency.name]} className={classes[course.learningPath.competency.name]}/></td>
      <td>{course.startDate}</td>
      <td>{course.endDate}</td>
      <td> 
        <LearningRateButton percentCompleted={course.percentCompleted} />
      </td>
      <td> 
        <ViewButton onButtonClick={onButtonClick} /> 
      </td>
    </tr>
  );
}


export default CourseCard;

// <Card className={classes.root} >
{/* <CardContent>
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
      } */}
      // </Card>