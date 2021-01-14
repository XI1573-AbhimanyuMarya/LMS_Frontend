import React from "react";
import { useStyles } from "./style";
import TableRow from "./TableRow";

const LearningPathWStatusTable = (props) => {
  const classes = useStyles();
  const data =props.data!==undefined ? props.data :  [
    {
      learningPathId: 1,
      learningPathName: "Machine Learning",
      employeesAssignedCount: 10,
      employeesCompletedCount: 2,
      employeesInprogressCount: 4,
      employeesOverdueCount: 5,
    },
    {
      learningPathId: 2,
      learningPathName: "Interaction Design Specialization",
      employeesAssignedCount: 9,
      employeesCompletedCount: 2,
      employeesInprogressCount: 4,
      employeesOverdueCount: 5,
    },
    {
      learningPathId: 3,
      learningPathName: "Python 3 Programming Specialization",
      employeesAssignedCount: 2,
      employeesCompletedCount: 2,
      employeesInprogressCount: 4,
      employeesOverdueCount: 5,
    },
    {
      learningPathId: 4,
      learningPathName: "Interaction Design Specialization",
      employeesAssignedCount: 4,
      employeesCompletedCount: 2,
      employeesInprogressCount: 4,
      employeesOverdueCount: 5,
    },
    {
      learningPathId: 5,
      learningPathName: "AWS Fundamentals Specialization",
      employeesAssignedCount: 13,
      employeesCompletedCount: 2,
      employeesInprogressCount: 4,
      employeesOverdueCount: 5,
    },
    {
      learningPathId: 6,
      learningPathName: "Machine Learning",
      employeesAssignedCount: 40,
      employeesCompletedCount: 2,
      employeesInprogressCount: 4,
      employeesOverdueCount: 5,
    },
    {
      learningPathId: 7,
      learningPathName: "Interaction Design Specialization",
      employeesAssignedCount: 16,
      employeesCompletedCount: 2,
      employeesInprogressCount: 4,
      employeesOverdueCount: 5,
    },
    {
      learningPathId: 8,
      learningPathName: "Python 3 Programming Specialization",
      employeesAssignedCount: 10,
      employeesCompletedCount: 2,
      employeesInprogressCount: 4,
      employeesOverdueCount: 5,
    },
    {
      learningPathId: 9,
      learningPathName: "Interaction Design Specialization",
      employeesAssignedCount: 11,
      employeesCompletedCount: 2,
      employeesInprogressCount: 4,
      employeesOverdueCount: 5,
    },
    {
      learningPathId: 10,
      learningPathName: "AWS Fundamentals Specialization",
      employeesAssignedCount: 10,
      employeesCompletedCount: 2,
      employeesInprogressCount: 4,
      employeesOverdueCount: 5,
    },
  ];
  const renderCourseList = data.map((lp) => {
    return <TableRow key={lp.learningPathId} lp={lp} />;
  });
  return (
    <div
      style={{
        overflow: "auto",
        height: "29vh",
        margin: "25px 0px 10px 0px",
        width: "82vw",
      }}
    >
      <table className={classes.tbl}>
        <thead className={classes.tblheading}>
          <tr>
            <th style={{ width: "25%" }}>Learning Path Name</th>
            <th>Assigned People</th>
            <th>Completed</th>
            <th>In-progress</th>
            <th>Overdue</th>
            <th></th>
          </tr>
        </thead>
        <tbody className={classes.tblbody}>{renderCourseList}</tbody>
      </table>
    </div>
  );
};

export default LearningPathWStatusTable;
