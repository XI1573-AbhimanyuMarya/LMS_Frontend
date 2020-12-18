import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';
import { useStyles } from './style';


const CourseCard = (props) => {
  const classes = useStyles();
  const { course, onButtonClick, showButton } = props;
  course.progress = '';

  return (

    <>
      <tr>
          <td style={{padding:"10px 30px"}}> {course.learningPath.name}</td>
          {/*<td style={{padding:"10px 30px"}}> {"UI"}</td>*/}
          {/* <td style={{padding:"10px 25px"}}> <img src={levels[course.learningPath.competency.id+"-"+course.learningPath.competency.name]} className={classes.levIcons}/></td>
          <td style={{padding:"10px 30px"}}>{dateFormat(course.startDate)}</td>
          <td style={{padding:"10px 30px"}}>{dateFormat(course.endDate)}</td> */}
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

 