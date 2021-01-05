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
    let reqBody={
      empid:loginState.user.id,
      ids:props.lpId,
      learningPathEmployeeId:props.learningPathEmployeesId
    };
    dispatch(Actions.learningPathActions.getLearningPathCourses(reqBody)); 
  }, []);
  const { learningPathCourses } = learningPathState;

  const {withRate,disable}=props;
  const renderCourseList=learningPathCourses.map((lpcourse)=>{
    return <CourseRow key={lpcourse.id} course={lpcourse} lpId={props.lpId} learningPathEmployeesId={ props.learningPathEmployeesId } withRate={withRate} disable={disable}/>
  });
  return (
    <div style={{overflowX:"auto", overflowY:"auto", height:"38vh",margin:"35px 0px 10px 0px"}}>
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