import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import getOr from "lodash/fp/getOr";
import ItemsCarousel from "react-items-carousel";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import CardMedia from "@material-ui/core/CardMedia";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import Box from "@material-ui/core/Box";
import ArrowForwardIosOutlinedIcon from "@material-ui/icons/ArrowForwardIosOutlined";
import ArrowBackIosOutlinedIcon from "@material-ui/icons/ArrowBackIosOutlined";

import DiscardPopup from "../../components/DiscardPopup/draganddrop";
import AddLearningPath from "../../images/AddLearningPath.svg";
import group2 from "../../images/group2.png";
import LearningPath from "../LearningPath/index";
import { useStyles } from "./style";
import WithLoading from "../../hoc/WithLoading";
import Actions from "../../store/actions";
import DashboardDetail from "../Chart";
import TopNav from "../../components/TopNav";
import Copyright from "../../components/Copyright";
import EmployeeDashboardDetail from "../Chart/EmployeeDashboard";

const Dashboard = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const loginState = useSelector((res) => res.loginState);
  const learningPathState = useSelector((state) => state.learningPathState);
  const userName = getOr("User Name", "user.fullName", loginState);
  const { mycourses, assignedCources, pathModelOpen } = learningPathState;

  const showDashboard =
    assignedCources.assignedLearningPaths &&
    assignedCources.assignedLearningPaths.length
      ? true
      : false;

  const [manager, setManager] = React.useState(false);
  useEffect(() => {
    if (loginState.roles[0].roleName != "ROLE_MANAGER") {
      dispatch(
        Actions.learningPathActions.getMyLearningPath(loginState.user.username)
      );
    } else {
      setManager(true);
      dispatch(
        Actions.learningPathActions.getAssignedLearningPath(
          loginState.user.username
        )
      );
    }
  }, []);
  const showMyDashboard =
    mycourses && !manager && mycourses.length ? true : false;
  /**
   * function to open learning path model
   */
  const handleClickOpen = () => {
    dispatch(Actions.learningPathActions.pathModelOpen(true));
  };

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

  const modalBtn = (
    <Button
      type="button"
      fullWidth
      variant="contained"
      className={classes.navSubmit}
      onClick={handleClickOpen}
      startIcon={<AddCircleOutlineOutlinedIcon style={{ fontSize: 20 }} />}
    >
      Create Learning Path
    </Button>
  );

  const renderWelcome = (
    <Box component="div" m="auto">
      <Container
        component="main"
        maxWidth="xs"
        className={classes.mainContainer}
      >
        <CssBaseline />
        <div className={classes.paper}>
          <CardMedia
            className={classes.media}
            image={
              loginState.roles[0].roleName != "ROLE_MANAGER"
                ? group2
                : AddLearningPath
            }
            title="add learning path"
          />
          <Typography component="h1" variant="h5" gutterBottom>
            Welcome, {userName}
          </Typography>
          <Typography component="h1" variant="subtitle2">
            {loginState.roles[0].roleName != "ROLE_MANAGER" ? (
              <div class={classes.employeeViewText}>
                There is no course assigned to you , request your manager for
                further learning.
              </div>
            ) : (
              <div>Please assign first learning path to your team</div>
            )}
          </Typography>
          {loginState.roles[0].roleName == "ROLE_MANAGER" ? (
            <Button
              type="button"
              fullWidth
              variant="contained"
              className={classes.submit}
              onClick={handleClickOpen}
              startIcon={
                <AddCircleOutlineOutlinedIcon style={{ fontSize: 40 }} />
              }
            >
              Create Learning Path
            </Button>
          ) : (
            <></>
          )}
        </div>
      </Container>
      <LearningPath
        handleClose={closeHandler}
        handleClosePath={handleClosePathHandler}
      />
      <DiscardPopup discardHandler={discardHandler} />
    </Box>
  );
  return (
    <div>
      <TopNav>{showDashboard ? modalBtn : ""}</TopNav>
      <main className="main-content">
        <div className={classes.toolbar} />
        <div className="container">
          {!showMyDashboard && manager && showDashboard && !pathModelOpen ? (
            <DashboardDetail />
          ) : showMyDashboard ? (
            <EmployeeDashboardDetail />
          ) : (
            renderWelcome
          )}
        </div>
        <div className="copyright">
          <Copyright />
        </div>
      </main>
    </div>
  );
};

export default WithLoading(Dashboard);
