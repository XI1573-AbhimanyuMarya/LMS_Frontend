import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Actions from "../../../store/actions";
import {
  SaveButton,
  UploadButton,
  WaitForApprovalButton,
  ApprovedButton,
} from "../../Button";
import { useStyles } from "./style";

const LearningRate = (props) => {
  const classes = useStyles();
  const learningPathState = useSelector((state) => state.learningPathState);
  const loginState = useSelector((res) => res.loginState);
  const { course, lpId, learningPathEmployeesId } = props;
  const { percentCompleted } = course;
  const dispatch = useDispatch();

  const focusHandler = () => {
    dispatch(Actions.learningPathActions.openBtn(course));
  };
  const changeHandler = (e) => {
    const changeRate = e.target.value;
    if (changeRate <= 100 && changeRate >= 0) {
      dispatch(
        Actions.learningPathActions.changeCourseRate(changeRate, course)
      );
    }
  };
  const saveRateHandler = () => {
    let reqBody = {
      employeeId: loginState.user.id,
      learningPathId: lpId,
      courseId: course.id,
      percentCompleted: parseInt(percentCompleted),
    };
    dispatch(Actions.learningPathActions.saveCourseRate(reqBody));
    if (parseInt(percentCompleted) === 100) {
      dispatch(Actions.learningPathActions.openBtn(course));
    }
    dispatch(
      Actions.learningPathActions.getMyLearningPath(loginState.user.username)
    );
  };

  const onViewClick = () => {
    dispatch(Actions.learningPathActions.uploadFileModelOpen(true));
  };

  const discardHandler = () => {
    dispatch(Actions.learningPathActions.uploadFileModelOpen(false));
  };

  const addImgHandler = (files) => {
    dispatch(Actions.learningPathActions.addCertificate(files));
  };

  const uploadDocs = () => {
    let formData = new FormData();
    learningPathState.certificates.forEach((file) => {
      formData.append("certificate", file);
    });
    formData.append("employeeId", loginState.user.id);
    formData.append("learningPathEmployeeId", learningPathEmployeesId);
    formData.append("courseId", course.id);
    dispatch(Actions.learningPathActions.uploadCertificate(formData));
    dispatch(
      Actions.learningPathActions.changeDocUploadedStatusForCourse(course.id)
    );
    discardHandler();
  };
  const BtnObj = {
    Save: <SaveButton saveRateHandler={saveRateHandler} />,
    Upload: (
      <UploadButton
        onViewClick={onViewClick}
        discardHandler={discardHandler}
        changeImgHandler={addImgHandler}
        uploadDocs={uploadDocs}
      />
    ),
    Wait: <WaitForApprovalButton />,
    Approved: <ApprovedButton />,
  };
  return (
    <>
      <input
        type="text"
        value={percentCompleted}
        onClick={focusHandler}
        onChange={changeHandler}
        className={classes.lpInField}
        pattern={"^[1-9][0-9]?$|^100$"}
      />
      {course.showBtn !== "" && BtnObj[course.showBtn]}
    </>
  );
};

export default LearningRate;
