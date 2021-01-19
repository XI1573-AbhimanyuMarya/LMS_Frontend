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
import group2 from "../../images/group2.png";
import LearningPath from "../LearningPath/index";
import { useStyles } from "./style";
import WithLoading from "../../hoc/WithLoading";
import Actions from "../../store/actions";
import TopNav from "../../components/TopNav";
import Copyright from "../../components/Copyright";
import EmployeeDashboardDetail from "../Chart/EmployeeDashboard";

import LearningPathWStatusTable from "../../components/Table/LearningPathWStatusTable";
import DashboardMatrix from "../../components/Dashboard/DashboardMatrix";
import PopularStuff from "../../components/Carousel/PopularStuff";
import LearnerTable from "../../components/Table/LearnersTable";

const Dashboard = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const loginState = useSelector((res) => res.loginState);
  const learningPathState = useSelector((state) => state.learningPathState);
  const userRole = JSON.parse(sessionStorage.getItem("USER_INFO")).roles[0]
    .roleName;
  const userName = getOr("User Name", "user.fullName", loginState);
  const [manager, setManager] = useState(false);
  const {
    mycourses,
    assignedCources,
    pathModelOpen,
    managerDashStats = {},
    managerPopularStuff,
    isLoading,
    dashStats,
    adminDashStats,
  } = learningPathState;

  const isObject = (data) => {
    return typeof data === "object" && data !== null;
  };
  const learningpathPrepareData = (elm) => {
    return {
      name: elm.learningPath.name,
      learningPathId: elm.learningPath.learningPathId,
      startDate: elm.startDate,
      endDate: elm.endDate,
      hasExpired: elm.isLearningPathExpired,
      learningPathEmployeesId: elm.learningPathEmployeesId,
      completed: elm.percentCompleted,
    };
  };

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
  };
  const employees = prepareData(assignedCources);

  const showDashboard = employees && employees.length ? true : false;
  const statsData = {
    totalCardDetail: {
      heading: "Assigned Learning Path",
      Total: dashStats.totalLearningPathAssigned,
    },
    Completed: dashStats.totalLearningPathCompleted,
    Inprogress: dashStats.totalLearningPathExpired,
    Overdue: dashStats.totalLearningPathInProgress,
  };
  // const { assignedCources, pathModelOpen,managerDashStats,managerPopularStuff,isLoading } = learningPathState;

  // const showDashboard = (assignedCources.assignedLearningPaths
  //   && assignedCources.assignedLearningPaths.length ?
  //   true : false);
  // var showDashboard = false;
  let showDashboardStats = false;
  for (var i in managerDashStats) {
    if (managerDashStats[i] !== 0) {
      showDashboardStats = true;
    }
  }

  // const {  } = learningPathState;
  // const showDashboard = (assignedCources.assignedLearningPaths
  //   && assignedCources.assignedLearningPaths.length ?
  //   true : false);
  // var showDashboard = false;
  // let statsData = {};

  // for (var i in adminDashStats) {
  //   if (adminDashStats[i] !== 0) {
  //     showDashboard = true;
  //     break;
  // }
  // }

  useEffect(() => {
    dispatch(
      Actions.learningPathActions.getManagerStats(loginState.user.username)
    );
    if (loginState.roles[0].roleName !== "ROLE_MANAGER") {
      dispatch(
        Actions.learningPathActions.getMyLearningPath(loginState.user.username)
      );
    } else {
      dispatch(
        Actions.learningPathActions.getAssignedLearningPath(
          loginState.user.username
        )
      );
      console.log(manager, "man");
      setManager(true);
      console.log(manager, "man");
    }
    dispatch(Actions.learningPathActions.clearCreateLpFormFields());
    dispatch(
      Actions.learningPathActions.getAdminStats(
        userRole === "ROLE_MANAGER"
          ? "MANAGER_DASHBOARD_STATS_REQUEST"
          : "ADMIN_DASHBOARD_STATS_REQUEST"
      )
    );
    dispatch(Actions.learningPathActions.getAdminLearningPathDetails());
    dispatch(Actions.learningPathActions.getPopularStuff(loginState.user.id));
  }, []);
  const showMyDashboard =
    mycourses && !manager && mycourses.length ? true : false;
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
          {/* {
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
                Hello Admin/HR
            </Typography>
          } */}
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
    // const data = {
    //   totalCardDetail: {
    //     heading: "Assigned Learning Path",
    //     Total: managerDashStats.totalLearningPathAssigned,
    //   },
    //   Completed: managerDashStats.totalLearningPathCompleted,
    //   Inprogress: managerDashStats.totalLearningPathExpired,
    //   Overdue: managerDashStats.totalLearningPathInProgress,
    // };
    // return (
    //   <>
    //     <DashboardMatrix data={data} />

    //     <div
    //       style={{
    //         width: "calc((100vw - 25%) - 16px)",
    //         height: "180px",
    //         margin: "20px",
    //       }}
    //     >
    //       <PopularStuff managerPopularStuff={managerPopularStuff} />
    //     </div>
    if (dashStats) {
      var data = {
        totalCardDetail: {
          heading: "Assigned Learning Path",
          Total: dashStats.totalLearningPathAssigned,
        },
        Completed: dashStats.totalLearningPathCompleted,
        Inprogress: dashStats.totalLearningPathInProgress,
        Overdue: dashStats.totalLearningPathExpired,
      };
    }
    return (
      <>
        <Box>
          {learningPathState.openDetailOfEnp &&
          learningPathState.openDetailOfEnp.empStatus ? (
            <LearnerTable />
          ) : (
            <>
              {dashStats && <DashboardMatrix data={data} />}
              <div
                style={{
                  width: "1060px",
                  height: "180px",
                  margin: "20px",
                }}
              >
                {userRole !== "ROLE_ADMIN" || userRole !== "ROLE_HR" ? (
                  <PopularStuff managerPopularStuff={managerPopularStuff} />
                ) : (
                  <LearningPathWStatusTable />
                )}
              </div>
            </>
          )}
        </Box>
      </>
    );
  };
  console.log(
    showDashboard,
    !showMyDashboard,
    manager,
    !pathModelOpen,
    "result"
  );
  return (
    <div>
      <TopNav></TopNav>
      <main className="main-content">
        <div className={classes.toolbar} />
        <div className="container">
          {!showMyDashboard && manager && showDashboard && !pathModelOpen ? (
            // <DashboardDetail />
            <DashData />
          ) : showMyDashboard ? (
            <EmployeeDashboardDetail statsData={statsData} />
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
