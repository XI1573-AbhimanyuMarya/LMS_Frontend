import React,{useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Actions from '../../../store/actions';
import { useStyles } from './style';

import CourseRow from './CourseRow';

const LearningCoursesTable=(props)=>{
  const classes=useStyles();
  const dispatch = useDispatch();
  const learningPathState = useSelector(state => state.learningPathState);
  const loginState = useSelector(res => res.loginState);
  useEffect(() => {
    dispatch(Actions.learningPathActions.getLearningPathCourses(loginState.user.id,props.lpId)); 
  }, []);
  const { learningPathCourses } = learningPathState;

  const {withRate}=props;
  const renderCourseList=learningPathCourses.map((lpcourse)=>{
    return <CourseRow key={lpcourse.id} course={lpcourse} lpId={props.lpId} withRate={withRate}/>
  });
  return (
    <div style={{overflowX:"auto", overflowY:"auto", height:"38vh",margin:"35px 30px 10px 0px"}}>
      <table className={classes.tbl}>
        <thead className={classes.tblheading}>
          <tr>
            <th style={{width:"25%"}}>Course Name</th>
            <th style={{width:"20%"}}>Learning Category</th>
            <th style={{width:withRate ? "20%" : "50%"}}>Level</th>
            { withRate && <th style={{width:"35%"}}>Learning Rate</th> }
          </tr>
        </thead>
        <tbody className={classes.tblbody}>
          {renderCourseList}
        </tbody>
      </table>
    </div>
  );
}

export default LearningCoursesTable;