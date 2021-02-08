import React from "react";
import { useStyles } from "./style";
import { useSelector, useDispatch } from "react-redux";
import TableRow from "./TableRow";
import Button from '@material-ui/core/Button';
import Actions from "../../../store/actions";
import { BUTTONS } from "../../../modules/constants";
import ArrowBackIos from "../../../images/ArrowBackIos.svg";
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
    return <TableRow key={lp.learningPathEmployeesId} lp={lp} levelId={cardData?.competency.id} levelName={cardData?.competency.name}/>;
  });
  return (
    <div
      style={{
        overflow: "auto",
        height: "auto",
        margin: "25px 0px 10px -10px",
        width: "82vw",
      }}
    >
      <div className={classes.outerContainer}>
        <Button onClick={handleBack} className={classes.button}>
          <img src={ArrowBackIos} style={{marginRight: '6px'}} />
          {BUTTONS.BACK}
        </Button>
        <div className={classes.cardContainer}>
          <LearningPathCardWOAction
            heading={cardData?.name}
            levelId={cardData?.competency.id}
            levelName={cardData?.competency.name}
            desc={cardData?.description}
          />
        </div>
      </div>
      <table className={classes.tbl}>
        <thead className={classes.tblheading}>
          <tr>
            <th className={classes.tblheadingFirst}>Learner Name</th>
            <th>Assigned by</th>
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
