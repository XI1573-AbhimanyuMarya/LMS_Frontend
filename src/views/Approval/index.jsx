import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Actions from "../../store/actions/index";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Paper } from "@material-ui/core";
import { MESSAGES, LEARNING_PATH_LABELS } from "../../modules/constants";
import EmployeeCard from "./EmployeeCard";
import UserSkelton from "../../components/Skelton/UserSkelton";
import WithLoading from "../../hoc/WithLoading";

import { useStyles } from "./style";
import TopNav from "../../components/TopNav";

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
    // dispatch(Actions.learningPathActions.getAssignedLearningPath(loginState.user.username));
    dispatch(Actions.learningPathActions.getPendingForApproval(loginState.user.username));

  }, []);
  const onDeleteAll = (employeeId) => {
    const employeeData = employees.find(emp => (emp.empID === employeeId))
    const ids = employeeData.learningPath.map(path => (path.learningPathEmployeesId))
    dispatch(Actions.learningPathActions.deleteAllPaths(ids))

  }
  const onDelete = (learningPathId) => {
    dispatch(Actions.learningPathActions.deletePath([learningPathId]))
  }

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
  const employees = prepareData(assignedCources);//prepareData(assignedCources.assignedLearningPaths);
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
          {/* <Box component="div" display="flex" justifyContent="center">
            <Grid container className={classes.container}>
              <Grid item xs={2}></Grid>
              <Grid item xs={8}>
              </Grid>
            </Grid>
          </Box> */}
          {/* <Paper className={classes.paper} elevation={1}> */}
            <div className={classes.cardData}>
              {isLoading && employees.length === 0 && <UserSkelton />}
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
          {/* </Paper> */}
        </div>
      </main>
    </React.Fragment>
  );
};

ManageAssignLearningPath.propTypes = {};

export default WithLoading(ManageAssignLearningPath);
