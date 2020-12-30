import React,{useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Actions from '../../../store/actions';
import { useStyles } from './style';

import CourseRow from './CourseRow';

const LearningCoursesTable=(props)=>{
  const classes=useStyles();
  const dispatch = useDispatch();
  const learningPathState = useSelector(state => state.learningPathState);
  useEffect(() => {
    dispatch(Actions.learningPathActions.getLearningPathCourses(props.lpId));
  }, []);
  const { learningPathCourses } = learningPathState;
  const renderCourseList=learningPathCourses.map((lpcourse)=>{
    return <CourseRow key={lpcourse.id} course={lpcourse} />
  });
  return (
      <table className={classes.tbl}>
        <thead className={classes.tblheading}>
          <tr>
            <th>Course Name</th>
            <th>Learning Category</th>
            <th>Level</th>
            <th style={{width:"30%"}}>Learning Rate</th>
          </tr>
        </thead>
        <tbody className={classes.tblbody}>
          {renderCourseList}
        </tbody>
      </table>
  );
}

export default LearningCoursesTable;