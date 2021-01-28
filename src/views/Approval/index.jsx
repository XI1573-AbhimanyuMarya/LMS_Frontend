import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Actions from "../../store/actions/index";
import Typography from "@material-ui/core/Typography";
import { MESSAGES, LEARNING_PATH_LABELS } from "../../modules/constants";
import EmployeeCard from "./EmployeeCard";
import WithLoading from "../../hoc/WithLoading";
import { useStyles } from "./style";
import TopNav from "../../components/TopNav";
import LearningPath from "../../views/LearningPath/index";
import DiscardPopup from "../../components/DiscardPopup/index";

const ManageAssignLearningPath = ({ props }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const getAssignedLearningPaths = useSelector(
    (state) => state.learningPathState
  );

  const loginState = useSelector(
    (state) => state.loginState
  );
  const { isLoading, assignedCources, deleteStatus, pfApproval } = getAssignedLearningPaths;
  const [selectedUsersArr, setSelectedUsersArr] = useState([]);

  useEffect(() => {
    dispatch(Actions.learningPathActions.getPendingForApproval(loginState.user.username))
  }, []);

  const onDeleteAll = (employeeId) => {
    const employeeData = employees.find(emp => (emp.empID === employeeId))
    const ids = employeeData.learningPath.map(path => (path.learningPathEmployeesId))
    dispatch(Actions.learningPathActions.deleteAllPaths(ids))

  }
  const onDelete = (learningPathId) => {
    dispatch(Actions.learningPathActions.deletePath([learningPathId]))
  }

  const closeHandler = () => {
    dispatch(Actions.learningPathActions.discardModelOpen(true));
  };

  const handleClosePathHandler = () => {
    dispatch(Actions.learningPathActions.pathModelOpen(false));
  };

  const discardHandler = (closeMainModel) => {
    dispatch(Actions.learningPathActions.discardModelOpen(false));
    if (closeMainModel) {
      dispatch(Actions.learningPathActions.pathModelOpen(false));
    }
  };

  const isObject = (data) => {
    return (typeof data === 'object' && data !== null);
  }
  const learningpathPrepareData = (elm) => {
    return {
      name: elm.learningPath.name,
      learningPathId: elm.learningPath.learningPathId,
      startDate: elm.startDate,
      endDate: elm.endDate,
      hasExpired: elm.isLearningPathExpired,
      learningPathEmployeesId: elm.learningPathEmployeesId,
      completed: elm.percentCompleted
    };
  }
  const prepareData = (data) => {
    let employees = [];
    if (isObject(data)) {
      let learningDetails;
      let tempEmployee;
      for (var key in data) {
        learningDetails = [];
        if (data.hasOwnProperty(key)) {
          if (data[key].length > 0) {
            data[key].forEach((elm) => {
              tempEmployee = elm.employee;
              learningDetails.push(learningpathPrepareData(elm));
            });
            employees.push({
              empID: tempEmployee.id,
              employee: tempEmployee,
              learningPath: learningDetails,
            });
          }
        }
      }
    }
    return employees;
  }

  const employees = prepareData(assignedCources);
  let renderUser = "";
  if (pfApproval.length > 0) {
    renderUser = pfApproval.map((data, i) => (
      <EmployeeCard key={i} data={data} onDeleteAll={onDeleteAll} onDelete={onDelete} />
    ));
  }

  return (
    <React.Fragment>
      <TopNav></TopNav>
      <main className="main-content">
        <div className={classes.toolbar} />
        <div className="container">
            <div className={classes.cardData}>
            <h2>Approvals</h2>
              {renderUser !== "" ? (
                renderUser
              ) : (
                  <div>
                    <Typography variant="h6" align="center">
                      {MESSAGES.NO_DATA_FOUND}
                    </Typography>
                  </div>
                )}
            </div>
        </div>
        <LearningPath
          handleClose={closeHandler}
          handleClosePath={handleClosePathHandler}
        />
        <DiscardPopup discardHandler={discardHandler} />
      </main>
    </React.Fragment>
  );
};

ManageAssignLearningPath.propTypes = {};

export default WithLoading(ManageAssignLearningPath);