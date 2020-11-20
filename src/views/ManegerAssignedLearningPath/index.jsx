import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Actions from "../../store/actions/index";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import { Paper } from "@material-ui/core";
import { LEARNING_PATH_LABELS } from "../../modules/constants";
import EmployeeCard from "./EmployeeCard";

import WithLoading from "../../hoc/WithLoading";

import { useStyles } from "./style";

const ManageAssignLearningPath = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      Actions.learningPathActions.getAssignedLearningPath("abhimanyu.marya@xebia.com")
    );
    return () => {
      console.log("cleanup");
    };
  }, []);
  const getAssignedLearningPaths = useSelector(
    (state) => state.learningPathState
  );
  console.log("getAssignedLearningPaths", getAssignedLearningPaths);
  // const newArray = getAssignedLearningPaths
  return (
    <>
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
              //   onChange={changeHandler}
            />
          </Grid>
        </Grid>
      </Box>
      <br />
      <br />
      <Typography variant="h6" className={classes.heading}>
        {LEARNING_PATH_LABELS.ASSIGNED_LEARNING_PATH}
      </Typography>
      <Paper className={classes.paper} elevation={0}>
        <div className={classes.cardData}>
          {[1, 2, 3, 4, 5].map((item) => (
            <EmployeeCard key={item} />
          ))}
        </div>
      </Paper>
    </>
  );
};

ManageAssignLearningPath.propTypes = {
  handleClose: PropTypes.func.isRequired,
  handleClosePath: PropTypes.func.isRequired,
};

export default WithLoading(ManageAssignLearningPath);
