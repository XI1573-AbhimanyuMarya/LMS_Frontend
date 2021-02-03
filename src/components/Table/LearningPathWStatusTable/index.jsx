import React from "react";
import { useStyles } from "./style";
import { useSelector } from "react-redux";
import Actions from "../../../../src/store/actions";
import WithLoading from "../../../../src/hoc/WithLoading";
import TableRow from "./TableRow";

const LearningPathWStatusTable = (props) => {
  const classes = useStyles();
  const learningPathState = useSelector((state) => state.learningPathState);
  const renderCourseList = learningPathState.adminLearningPathDetails && learningPathState.adminLearningPathDetails.map((lp) => {
    return <TableRow key={lp.learningPathId} lp={lp} />;
  });
  return (
    <div
      style={{
        overflow: "auto",
        height: "29vh",
        margin: "10px 0px 10px -216px",
        width: "100%",
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

export default WithLoading(LearningPathWStatusTable);
