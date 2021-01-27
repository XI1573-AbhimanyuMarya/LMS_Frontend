import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { useStyles } from "./style";
import WithLoading from "../../hoc/WithLoading";
import TopNav from "../../components/TopNav";
import Copyright from "../../components/Copyright";

const ManageLearningPath = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userRole = JSON.parse(sessionStorage.getItem("USER_INFO")).roles[0].roleName;


  // const handleClickOpen = () => {
  //   dispatch(Actions.learningPathActions.pathModelOpen(true));
  //   dispatch(Actions.learningPathActions.clearCreateLpFormFields());
  // };

  const renderWelcome = (
    // <Box component="div" m="auto">
      <Container
        component="main"
        className={classes.mainContainer}>
        <div className={classes.paper}>
          <h1>Welcome</h1>
        </div>
      </Container>
    // </Box>
  );

  return (
    <div>
      <TopNav></TopNav>
      <main className="main-content">
        {renderWelcome}
      </main>
      <div className="copyright">
        <Copyright />
      </div>
    </div>
  );
};

export default WithLoading(ManageLearningPath);