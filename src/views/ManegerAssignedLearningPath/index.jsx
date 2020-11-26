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
  const { isLoading } = getAssignedLearningPaths;
  const [selectedUsersArr, setSelectedUsersArr] = useState([]);
  useEffect(() => {
    console.log("employees.length", employees.length);
    if (employees.length === 0) {
      dispatch(
        Actions.learningPathActions.getAssignedLearningPath(
          "abhimanyu.marya@xebia.com"
        )
      );
    } else {
      setSelectedUsersArr(isLoading);
    }
  }, []);

  const data = getAssignedLearningPaths.assignedCources.assignedLearningPaths;

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
  let renderUser = "";
  if (employees.length > 0) {
    renderUser = employees.map((data, i) => (
      <EmployeeCard key={i} data={data} />
    ));
    console.log("employees", employees);
  }

  return (
    <div>
      <TopNav />
      <main className="main-content">
        <div className={classes.toolbar} />
        <div className="container">
          <Box component="div" display="flex" justifyContent="center">
            <Grid container className={classes.container}>
              <Grid item xs={2}></Grid>
              <Grid item xs={8}>
                <TextField
                  label={LEARNING_PATH_LABELS.SEARCH_BY_MANAGER}
                  type="search"
                  variant="outlined"
                  className={classes.searchField}
                  name="search"
                />
              </Grid>
            </Grid>
          </Box>

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
    </div>
  );
};

ManageAssignLearningPath.propTypes = {};

export default WithLoading(ManageAssignLearningPath);
