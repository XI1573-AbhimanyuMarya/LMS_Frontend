import React, { useState, useEffect } from "react";
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

  const [course2, setCourse2] = useState(false);
  const [course3, setCourse3] = useState(false);
  // debugger;
  const classes = useStyles();
  const learningPathState = useSelector((state) => state.learningPathState);
  const loginState = useSelector((res) => res.loginState);
  const { course, lpId, learningPathEmployeesId } = props;
  const { percentCompleted, status } = course;
  const dispatch = useDispatch();

  const focusHandler = () => {
    console.log(course, "csss")
    dispatch(Actions.learningPathActions.openBtn(course, ""));
  };


  const changeHandler = (e) => {
    console.log(course, "csss222")

    const changeRate = e.target.value;
    if (changeRate < 100) {
      dispatch(Actions.learningPathActions.openBtn(course, ""));
    }
    if (changeRate <= 100 && changeRate >= 0) {
      dispatch(
        Actions.learningPathActions.changeCourseRate(changeRate, course)
      );
    }
  };

  console.log(course, "course vivek")
  const saveRateHandler = () => {
    let reqBody = {
      employeeId: loginState.user.id,
      learningPathId: lpId,
      courseId: course.id,
      percentCompleted: parseInt(percentCompleted),
    };
    dispatch(Actions.learningPathActions.saveCourseRate(reqBody));
    if (parseInt(percentCompleted) === 100) {
      dispatch(Actions.learningPathActions.openBtn(course, "100"));
    }
    dispatch(
      Actions.learningPathActions.getMyLearningPath(loginState.user.username)
    );
  };

  const onViewClick = () => {
    console.log(course, "yyyyyy");
    if (course) dispatch(Actions.learningPathActions.saveCourse(course));
    dispatch(Actions.learningPathActions.uploadFileModelOpen(true));
  };

  useEffect(() => {
    setCourse3(course2);
    console.log(course2, course3, "course23")
  })

  const discardHandler = () => {
    dispatch(Actions.learningPathActions.uploadFileModelOpen(false));
  };

  const addImgHandler = (files) => {
    dispatch(Actions.learningPathActions.addCertificate(files));
  };

  const uploadDocs = () => {

    // console.log(lpId, "lpId");
    // console.log(course, "course 2")
    let formData = new FormData();
    learningPathState.certificates.forEach((file) => {
      formData.append("certificate", file);
    });
    formData.append("employeeId", loginState.user.id);
    formData.append("learningPathEmployeeId", learningPathEmployeesId);
    formData.append("courseId", learningPathState.courseIdSavedForUpload);
    dispatch(Actions.learningPathActions.uploadCertificate(formData));
    dispatch(
      Actions.learningPathActions.changeDocUploadedStatusForCourse(learningPathState.courseIdSavedForUpload)
    );

    discardHandler();
  };
  const btnObj = (kind) => {
    const xyz = {

      Save: <SaveButton saveRateHandler={saveRateHandler} />,
      Upload: (
        <UploadButton
          courseName={course}
          key={course.name}
          onViewClick={onViewClick}
          discardHandler={discardHandler}
          changeImgHandler={addImgHandler}
          uploadDocs={uploadDocs}
        />
      ),
      Wait: <WaitForApprovalButton />,
      Approved: <ApprovedButton />,
    }
    return xyz[kind]
  };
  return (
    // <div key={course.name}>
    <>
      <input
        // disabled={status == "APPROVED"}
        type="text"
        value={percentCompleted}
        onClick={focusHandler}
        onChange={changeHandler}
        className={classes.lpInField}
        pattern={"^[1-9][0-9]?$|^100$"}
      />
      {course.showBtn !== "" && btnObj(course.showBtn)}
    </>
    // </div>

  );
};

export default LearningRate;
