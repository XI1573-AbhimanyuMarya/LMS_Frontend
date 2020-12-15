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
import Beginner from '../../images/101-Beginner.svg';
import Intermediate from '../../images/102-Intermediate.svg';
import Advance from '../../images/103-Advance.svg';
import Expert from '../../images/104-Expert.svg';
import { SHOW_LEVELS } from '../../modules/constants';
//const levels=LEVELS;
// {
//   "101-Beginner":Beginner,
//   "102-Intermediate":Intermediate,
//   "103-Advance":Advance,
//   "104-Expert":Expert
// };
const dateFormat=(inputDate) =>{
  var date = new Date(inputDate);
  if (!isNaN(date.getTime())) {
    let mon=parseInt(date.getMonth()) + 1;
    if(mon<10){
      mon="0"+mon;
    }
    return date.getDate()+ '/' + mon + '/' + date.getFullYear();
  }
}

const CourseCard = (props) => {
  const classes = useStyles();
  const { course, onButtonClick, showButton } = props;
  course.progress = '';
  // let btnlabel = "Let's begin"
  // if (course?.progress) {
  //   btnlabel = "Explore"
  // }

  // let darkBar = 0;
  // if (course?.competency?.name === "Beginner") {
  //   darkBar = 1;
  // } else if (course?.competency?.name === "Intermediate") {
  //   darkBar = 2
  // } else if (course?.competency?.name === "Expert") {
  //   darkBar = 3
  // }
  return (

    <>
        <tr>
          <td style={{padding:"10px 30px"}}> {course.learningPath.name}</td>
          {/*<td style={{padding:"10px 30px"}}> {"UI"}</td>*/}
          <td style={{padding:"10px 25px"}}> <img src={SHOW_LEVELS[course.learningPath.competency.id+"-"+course.learningPath.competency.name]} className={classes.levIcons}/></td>
          <td style={{padding:"10px 30px"}}>{dateFormat(course.startDate)}</td>
          <td style={{padding:"10px 30px"}}>{dateFormat(course.endDate)}</td>
          <td style={{padding:"10px 30px"}}> 
            <Button variant="outlined" size="small" color="primary">
            {"30"}
            </Button>
          </td>
          <td style={{padding:"10px 30px"}}> <Button variant="outlined" size="small" style={{borderColor:"#f07402",color:"#f07402"}}>
            {"View"}
            </Button></td>
        </tr>
    </>

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