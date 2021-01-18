import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import getOr from "lodash/fp/getOr";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import CardMedia from "@material-ui/core/CardMedia";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import Box from "@material-ui/core/Box";
import DiscardPopup from "../../components/DiscardPopup/index";
import AddLearningPath from "../../images/AddLearningPath.svg";
import LearningPath from "../LearningPath/index";
import { useStyles } from "./style";
import WithLoading from "../../hoc/WithLoading";
import Actions from "../../store/actions";
import TopNav from "../../components/TopNav";
import Copyright from "../../components/Copyright";
import LearningPathWStatusTable from "../../components/Table/LearningPathWStatusTable";
import DashboardMatrix from "../../components/Dashboard/DashboardMatrix";
import PopularStuff from "../../components/Carousel/PopularStuff";
import LearnerTable from "../../components/Table/LearnersTable";

const Dashboard = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const loginState = useSelector((res) => res.loginState);
  const learningPathState = useSelector((state) => state.learningPathState);
  const userName = getOr("User Name", "user.fullName", loginState);
  const { assignedCources, pathModelOpen, dashStats, adminDashStats, managerPopularStuff, isLoading } = learningPathState;
  // const showDashboard = (assignedCources.assignedLearningPaths
  //   && assignedCources.assignedLearningPaths.length ?
  //   true : false);
  var showDashboard = false;
  let statsData = {};

  for (var i in adminDashStats) {
    if (adminDashStats[i] !== 0) {
      showDashboard = true;
      break;
    }
  }

  useEffect(() => {
    const userRole = loginState.user.designation;
    dispatch(
      Actions.learningPathActions.getAssignedLearningPath(
        loginState.user.username
      )
    );
    dispatch(Actions.learningPathActions.clearCreateLpFormFields());
    dispatch(Actions.learningPathActions.getAdminStats(userRole === 'Manager'
      ? 'MANAGER_DASHBOARD_STATS_REQUEST' : 'ADMIN_DASHBOARD_STATS_REQUEST'
    ));
    dispatch(Actions.learningPathActions.getAdminLearningPathDetails());
    dispatch(Actions.learningPathActions.getPopularStuff(loginState.user.id));
  }, []);
  /**
   * function to open learning path model
   */
  const handleClickOpen = () => {
    dispatch(Actions.learningPathActions.pathModelOpen(true));
    dispatch(Actions.learningPathActions.clearCreateLpFormFields());
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
            image={AddLearningPath}
            title="add learning path"
          />
          <Typography component="h1" variant="h5" gutterBottom>
            Welcome, {userName}
          </Typography>
          {
            loginState.user.designation !== "Admin" || 
            loginState.user.designation !== "Hr" ?
            <>
              <Typography
                component="h1"
                variant="subtitle2"
                style={{ color: "#858585" }}
              >
                Please assign first learning path to your team
              </Typography>
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
            </> : 
            <Typography
              component="h1"
              variant="subtitle2"
              style={{ color: "#858585" }}>
                Hello World
            </Typography>
          }
        </div>
      </Container>
      <LearningPath
        handleClose={closeHandler}
        handleClosePath={handleClosePathHandler}
      />
      <DiscardPopup discardHandler={discardHandler} />
    </Box>
  );

  const DashData = () => {
    if (dashStats) {
      var data = {
        totalCardDetail: {
          heading: "Assigned Learning Path",
          Total: dashStats.totalLearningPathAssigned
        },
        Completed: dashStats.totalLearningPathCompleted,
        Inprogress: dashStats.totalLearningPathInProgress,
        Overdue: dashStats.totalLearningPathExpired
      };
    }
    return (
      <>
      <Box>
        {learningPathState.openDetailOfEnp && learningPathState.openDetailOfEnp.empStatus ?
        <LearnerTable /> :
        <>
          {dashStats &&
          <DashboardMatrix data={data} />}
          <div
            style={{
              width: "1060px",
              height: "180px",
              margin: "20px",
            }}
          >
          { loginState.user.designation !== "Admin" || 
          loginState.user.designation !== "Hr" ?
            <PopularStuff managerPopularStuff={managerPopularStuff} /> :
            <LearningPathWStatusTable />
          }
          </div>
        </>
        }
      </Box>
      </>
    );
  };

  return (
    <div>
      <TopNav></TopNav>
      <main className="main-content">
        <div className={classes.toolbar} />
        <div className="container">
          {/* removed showDashboard condition */}
          {!pathModelOpen ? (
            // <DashboardDetail />
            <DashData />
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
