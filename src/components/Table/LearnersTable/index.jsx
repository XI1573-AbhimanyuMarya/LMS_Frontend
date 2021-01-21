import React from "react";
import { useStyles } from "./style";
import { useSelector, useDispatch } from "react-redux";
import TableRow from "./TableRow";
import Button from '@material-ui/core/Button';
import Actions from "../../../store/actions";
import { BUTTONS } from "../../../modules/constants";
import LearningPathCardWOAction from "../../../components/Card/LearningPathCardWOAction";

const LearnerTable = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const learningPathState = useSelector((state) => state.learningPathState);
  const handleBack = () => {
    dispatch(Actions.learningPathActions.openDetails(false, 0));
  };
  const cardData = learningPathState.adminDetails?.learningPath;
  const renderCourseList = learningPathState.adminDetails && learningPathState.adminDetails.employeeDetails.map((lp) => {
    return <TableRow key={lp.learningPathEmployeesId} lp={lp} />;
  });
  return (
    <div
      style={{
        overflow: "auto",
        height: "auto",
        margin: "25px 0px 10px 0px",
        width: "82vw",
      }}
    >
      <Button onClick={handleBack} className={classes.button}>
        {BUTTONS.BACK}
      </Button>
      <LearningPathCardWOAction
        heading={cardData?.name}
        levelId={cardData?.competency.id}
        levelName={cardData?.competency.name}
        desc={cardData?.description}
      />
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
