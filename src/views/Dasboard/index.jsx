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
import group2 from "../../images/group2.png";
import EmployeeDashboardDetail from "../Chart/EmployeeDashboard";

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
    dashStats,
    dashGraphAdmin = {},
    adminDashStats,
    managerPopularStuff,
    isLoading,
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

  const showDashboard = employees && employees.length ? true : false; // manan's
  const statsData = {
    totalCardDetail: {
      heading: "Assigned Learning Path",
      Total: dashStats.totalLearningPathAssigned,
    },
    Completed: dashStats.totalLearningPathCompleted,
    Inprogress: dashStats.totalLearningPathInProgress,
    Overdue: dashStats.totalLearningPathExpired,
  };

  useEffect(() => {
    if (userRole == "ROLE_ADMIN" || userRole == "ROLE_HR") {
      dispatch(
        Actions.learningPathActions.getAdminStats(
          "ADMIN_DASHBOARD_STATS_REQUEST"
        )
      );
      dispatch(Actions.learningPathActions.getAdminGraphs());
    } else {
      dispatch(
        Actions.learningPathActions.getManagerStats(
          loginState.roles[0],
          loginState.user.username
        )
      );
    }

    if (loginState.roles[0].roleName !== "ROLE_MANAGER") {
      dispatch(
        Actions.learningPathActions.getMyLearningPath(loginState.user.username)
      );
    } else if (userRole === "ROLE_MANAGER") {
      dispatch(
        Actions.learningPathActions.getAssignedLearningPath(
          loginState.user.username
        )
      );
      dispatch(
        Actions.learningPathActions.getManagerStats(
          loginState.roles[0],
          loginState.user.username
        )
      );
      setManager(true);
    }

    dispatch(Actions.learningPathActions.clearCreateLpFormFields());

    dispatch(Actions.learningPathActions.getAdminLearningPathDetails());
    dispatch(Actions.learningPathActions.getPopularStuff(loginState.user.id));
  }, []);

  const showMyDashboard =
    mycourses &&
      !manager &&
      userRole !== "ROLE_ADMIN" &&
      userRole !== "ROLE_HR" &&
      mycourses.length
      ? true
      : false;

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
          Total: dashStats.totalLearningPathAssigned,
        },
        learningPathGraphAdmin: dashGraphAdmin,
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
                    width: "calc((100vw - 26%) - 16px)",
                    height: "180px",
                    margin: "20px",
                  }}
                >
                  {userRole !== "ROLE_ADMIN" && userRole !== "ROLE_HR" ? (
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

  return (
    <div>
      <TopNav></TopNav>
      <main className="main-content">
        <div className={classes.toolbar} />
        <div className="container">
          {
            !showMyDashboard && !pathModelOpen ? (
              // <DashboardDetail />
              <DashData />
            ) : showMyDashboard ? (
              <EmployeeDashboardDetail statsData={statsData} />
            ) :
                (
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
