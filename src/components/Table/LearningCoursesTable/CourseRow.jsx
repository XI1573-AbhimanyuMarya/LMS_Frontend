import React from "react";
import LearningRate from "./LearningRate";
import { SHOW_LEVELS } from "../../../modules/constants";
import { useStyles } from "./style";

import { CompletedButton, WaitForApprovalButton } from "../../Button";

const CourseRow = (props) => {

  const classes = useStyles();
  const {
    course,
    withRate,
    lpId,
    learningPathEmployeesId,
    completed,
    selectedLp,
    courseId
  } = props;

  const showRate = () => {

    if (selectedLp.approvalStatus === "APPROVED") {
      return <CompletedButton />;
    } else if (
      course.percentCompleted === 100 &&
      course.documentsUploaded &&
      selectedLp.approvalStatus === "PENDING"
    ) {
      return <WaitForApprovalButton />;
    } else {

      return (
        <LearningRate
          allCourses={props.allCourses}
          courseId={courseId}
          status={selectedLp.approvalStatus}
          key={course.name}
          course={{ ...course }}
          lpId={lpId}
          learningPathEmployeesId={learningPathEmployeesId}
        />
      );
    }
  };
  return (
    <tr className={classes.tblrow}>
      <td>{course.name}</td>
      <td>{course.category.name}</td>
      <td>
        <img
          src={SHOW_LEVELS[course.competency.id + "-" + course.competency.name]}
          className={classes[course.competency.name]}
        />
      </td>
      {withRate && <td>{showRate()}</td>}
    </tr>
  );
};

export default CourseRow;
