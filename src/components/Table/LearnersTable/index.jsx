import React from "react";
import { useStyles } from "./style";
import TableRow from "./TableRow";

const LearnerTable = (props) => {
  const classes = useStyles();
  const data =props.data!==undefined ? props.data :  [
    {
      learnerNameId: 1,
      learnerName: "Ashok Tiwari",
      level: "Advance",
      startDate: "dd/mm/yy",
      endDate: "dd/mm/yy",
      percentCompleted: "88%",
    },
    {
      learnerNameId: 2,
      learnerName: "Rajveer Shirkhe",
      level: "Advance",
      startDate: "dd/mm/yy",
      endDate: "dd/mm/yy",
      percentCompleted: "14%",
    },
    {
      learnerNameId: 3,
      learnerName: "Faizan Aalam",
      level: "Advance",
      startDate: "dd/mm/yy",
      endDate: "dd/mm/yy",
      percentCompleted: "88%",
    },
    {
      learnerNameId: 4,
      learnerName: "Khursheed Shaikh",
      level: "Advance",
      startDate: "dd/mm/yy",
      endDate: "dd/mm/yy",
      percentCompleted: "50%",
    },
    {
      learnerNameId: 5,
      learnerName: "Pradeep Pandya",
      level: "Advance",
      startDate: "dd/mm/yy",
      endDate: "dd/mm/yy",
      percentCompleted: "38%",
    },
    {
      learnerNameId: 6,
      learnerName: "Ashok Tiwari",
      level: "Advance",
      startDate: "dd/mm/yy",
      endDate: "dd/mm/yy",
      percentCompleted: "88%",
    },
    {
      learnerNameId: 7,
      learnerName: "Khursheed Shaikh",
      level: "Advance",
      startDate: "dd/mm/yy",
      endDate: "dd/mm/yy",
      percentCompleted: "24%",
    },
    {
      learnerNameId: 8,
      learnerName: "Khursheed Shaikh",
      level: "Advance",
      startDate: "dd/mm/yy",
      endDate: "dd/mm/yy",
      percentCompleted: "83%",
    },
    {
      learnerNameId: 9,
      learnerName: "Rajveer Shirkhe",
      level: "Advance",
      startDate: "dd/mm/yy",
      endDate: "dd/mm/yy",
      percentCompleted: "58%",
    },
    {
      learnerNameId: 10,
      learnerName: "Ashok Tiwari",
      level: "Advance",
      startDate: "dd/mm/yy",
      endDate: "dd/mm/yy",
      percentCompleted: "8%",
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
            <th style={{ width: "25%" }}>Learner Name</th>
            <th>Level</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>% completed</th>
          </tr>
        </thead>
        <tbody className={classes.tblbody}>{renderCourseList}</tbody>
      </table>
    </div>
  );
};

export default LearnerTable;
