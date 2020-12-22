import React from 'react';
import LearningRate from './LearningRate';
import { SHOW_LEVELS } from '../../../modules/constants';
import { useStyles } from './style';

const CourseRow=(props)=>{
  const classes=useStyles();
  const {course,withRate,lpId}=props;
  return (
    <tr className={classes.tblrow}>
      <td>{course.name}</td>
      <td>{course.category.name}</td>
      <td><img src={SHOW_LEVELS[course.competency.id+"-"+course.competency.name]} className={classes[course.competency.name]}/></td>
      {withRate && <td><LearningRate key={course.id} course={course} lpId={lpId}/></td>}
    </tr> 
  );
}

export default CourseRow;