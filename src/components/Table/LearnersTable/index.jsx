import React from "react";
import { useStyles } from "./style";
import { useSelector, useDispatch } from "react-redux";
import TableRow from "./TableRow";
import Button from '@material-ui/core/Button';
import Actions from "../../../store/actions";
import { BUTTONS } from "../../../modules/constants";

const LearnerTable = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const learningPathState = useSelector((state) => state.learningPathState);
  const handleBack = () => {
    dispatch(Actions.learningPathActions.openDetails(false, 0));
  };
  const renderCourseList = learningPathState.adminDetails && learningPathState.adminDetails.map((lp) => {
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
      <Button onClick={handleBack} className={classes.button}>
        {BUTTONS.BACK}
      </Button>
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
