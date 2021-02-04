import React from "react";
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
  } = props;


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

    </tr>
  );
};

export default CourseRow;
