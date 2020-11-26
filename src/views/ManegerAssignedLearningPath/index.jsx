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
  const { isLoading, assignedCources, deleteStatus } = getAssignedLearningPaths;
  const [selectedUsersArr, setSelectedUsersArr] = useState([]);
  useEffect(() => {
    dispatch(Actions.learningPathActions.getAssignedLearningPath(loginState.user.username));

  }, [deleteStatus]);
  const onDeleteAll = (employeeId) => {
    const employeeData = employees.find(emp => (emp.empID === employeeId))
    const ids = employeeData.learningPath.map(path => (path.learningPathEmployeesId))
    dispatch(Actions.learningPathActions.deleteAllPaths(ids))

  }
  const onDelete = (learningPathId) => {
    dispatch(Actions.learningPathActions.deletePath([learningPathId]))
    console.log(learningPathId);
  }

  const prepareData = (data) => {
    let employees = [];
    if (data && data.length > 0) {
      data.map((path) => {
        path.madeFor.map((emp) => {
          let id = parseInt(emp.employee.id);
          let tempEmployee = Object.assign({}, emp.employee);
          let learningPath = {
            name: path.name,
            learningPathId: path.learningPathId,
            startDate: path.startDate,
            endDate: path.endDate,
            hasExpired: path.isLearningPathExpired,
            learningPathEmployeesId: emp.learningPathEmployeesId,
            completed: emp.percentCompleted,
          };
          const existEmployee = employees.find((item) => item.empID === id);
          if (existEmployee) {
            existEmployee.learningPath.push(learningPath);
          } else {
            employees.push({
              empID: id,
              employee: tempEmployee,
              learningPath: [learningPath],
            });
          }
        });
      });
    }
    return employees;
  }
  const employees = prepareData(assignedCources.assignedLearningPaths);

  let renderUser = "";
  if (employees.length > 0) {
    renderUser = employees.map((data, i) => (
      <EmployeeCard key={i} data={data} onDeleteAll={onDeleteAll} onDelete={onDelete}/>
    ));
  }

  return (
    <React.Fragment>
      <TopNav></TopNav>
      <main className="main-content">
        <div className={classes.toolbar} />
        <div className="container">
          <Box component="div" display="flex" justifyContent="center">
            <Grid container className={classes.container}>
              <Grid item xs={2}></Grid>
              <Grid item xs={8}>
                <TextField
                  className={classes.search}
                  label={LEARNING_PATH_LABELS.SEARCH_BY_MANAGER}
                  type="search"
                  variant="outlined"
                  className={classes.searchField}
                  name="search"
                />
              </Grid>
            </Grid>
          </Box>
          <br />
          <br />
          <Typography variant="h6" className={classes.heading}>
            {LEARNING_PATH_LABELS.ASSIGNED_LEARNING_PATH}
          </Typography>
          <Paper className={classes.paper} elevation={1}>
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
          </Paper>
        </div>
      </main>
    </React.Fragment>
  );
};

ManageAssignLearningPath.propTypes = {};

export default WithLoading(ManageAssignLearningPath);
