import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Actions from '../../../store/actions';
import { SaveButton,UploadButton,WaitForApprovalButton,ApprovedButton } from '../../Button';
import { useStyles } from './style';

const LearningRate=(props)=>{
  const classes=useStyles();
  //const learningPathState = useSelector(state => state.learningPathState);
  const loginState = useSelector(res => res.loginState);
  const {course,lpId}=props;
  const {percentageCompleted}=course;
  const dispatch=useDispatch();
  const focusHandler=()=>{
    dispatch(Actions.learningPathActions.openBtn(course));
  };
  const changeHandler=(e)=>{
    const changeRate=e.target.value;
    dispatch(Actions.learningPathActions.changeCourseRate(changeRate,course));
  }
  const saveRateHandler=()=>{
    let reqBody={
      "employeeId":loginState.user.id,
      "learningPathId":lpId,
      "courseId":course.id,
      "percentCompleted":parseInt(percentageCompleted)
    };
    dispatch(Actions.learningPathActions.saveCourseRate(reqBody));
  }

  const onViewClick = () =>{
    dispatch(Actions.learningPathActions.uploadFileModelOpen(true));
  }

  const discardHandler = () =>{
    dispatch(Actions.learningPathActions.uploadFileModelOpen(false));
  }

  const BtnObj={
    "Save":<SaveButton saveRateHandler={saveRateHandler}/>,
    "Upload":<UploadButton onViewClick={onViewClick} discardHandler={discardHandler}/>,
    "Wait":<WaitForApprovalButton/>,
    "Approved":<ApprovedButton />
  }
  return (
    <>
      <input type="text" 
        value={percentageCompleted}
        onFocus={focusHandler} onChange={changeHandler}
        className={classes.lpInField}
      />
      {
        course.showBtn!=='' && BtnObj[course.showBtn]
      }
    </>
  );
}

export default LearningRate;