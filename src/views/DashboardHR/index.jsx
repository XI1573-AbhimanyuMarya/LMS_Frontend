// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import getOr from "lodash/fp/getOr";
// import ItemsCarousel from "react-items-carousel";

// import Button from "@material-ui/core/Button";
// import CssBaseline from "@material-ui/core/CssBaseline";
// import Typography from "@material-ui/core/Typography";
// import Container from "@material-ui/core/Container";
// import CardMedia from "@material-ui/core/CardMedia";
// import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
// import Box from "@material-ui/core/Box";
// import ArrowForwardIosOutlinedIcon from "@material-ui/icons/ArrowForwardIosOutlined";
// import ArrowBackIosOutlinedIcon from "@material-ui/icons/ArrowBackIosOutlined";

// import DiscardPopup from "../../components/DiscardPopup/draganddrop";
// import AddLearningPath from "../../images/AddLearningPath.svg";
// import LearningPath from "../LearningPath/index";
// import { useStyles } from "./style";
// import WithLoading from "../../hoc/WithLoading";
// import Actions from "../../store/actions";
// import DashboardDetail from "../Chart";
// import TopNav from "../../components/TopNav";
// import Copyright from "../../components/Copyright";

// const DashboardHR = () => {
//   const classes = useStyles();
//   const dispatch = useDispatch();
//   const loginState = useSelector((res) => res.loginState);
//   const learningPathState = useSelector((state) => state.learningPathState);
//   const userName = getOr("User Name", "user.fullName", loginState);
//   const { assignedCources, pathModelOpen } = learningPathState;

//   const showDashboard = (assignedCources.assignedLearningPaths
//     && assignedCources.assignedLearningPaths.length ?
//     true : false);

//   useEffect(() => {
//     dispatch(
//       Actions.learningPathActions.getAssignedLearningPath(
//         loginState.user.username
//       )
//     );
//     dispatch(Actions.learningPathActions.clearCreateLpFormFields());
//   }, []);
//   /**
//    * function to open learning path model
//    */
//   const handleClickOpen = () => {
//     dispatch(Actions.learningPathActions.pathModelOpen(true));
//     dispatch(Actions.learningPathActions.clearCreateLpFormFields());
//   };

//   const closeHandler = () => {
//     dispatch(Actions.learningPathActions.discardModelOpen(true));
//   };

//   const handleClosePathHandler = () => {
//     dispatch(Actions.learningPathActions.pathModelOpen(false));
//   };

//   const discardHandler = (closeMainModel) => {
//     dispatch(Actions.learningPathActions.discardModelOpen(false));
//     if (closeMainModel) {
//       dispatch(Actions.learningPathActions.pathModelOpen(false));
//     }
//   };

//   const modalBtn = (
//     <Button
//       type="button"
//       fullWidth
//       variant="contained"
//       className={classes.navSubmit}
//       onClick={handleClickOpen}
//       startIcon={<AddCircleOutlineOutlinedIcon style={{ fontSize: 20 }} />}
//     >
//       Create Learning Path
//     </Button>
//   );

//   const renderWelcome = (
//     <Box component="div" m="auto">
//       <Container
//         component="main"
//         maxWidth="xs"
//         className={classes.mainContainer}
//       >
//         <CssBaseline />
//         <div className={classes.paper}>
//           <CardMedia
//             className={classes.media}
//             image={AddLearningPath}
//             title="add learning path"
//           />
//           <Typography component="h1" variant="h5" gutterBottom>
//             Welcome, {userName}
//           </Typography>
//           <Typography component="h1" variant="subtitle2" style={{color:"#858585"}} >
//             Please get out
//           </Typography>
//           <Button
//             type="button"
//             fullWidth
//             variant="contained"
//             className={classes.submit}
//             onClick={handleClickOpen}
//             startIcon={
//               <AddCircleOutlineOutlinedIcon style={{ fontSize: 40 }} />
//             }
//           >
//             Create Learning Path
//           </Button>
//         </div>
//       </Container>
//       <LearningPath
//         handleClose={closeHandler}
//         handleClosePath={handleClosePathHandler}
//       />
//       <DiscardPopup discardHandler={discardHandler} />
//     </Box>
//   );
//   return (
//     <div>
//       <TopNav>{showDashboard ? modalBtn : ""}</TopNav>
//       <main className="main-content">
//         <div className={classes.toolbar} />
//         <div className="container">
//           {showDashboard && !pathModelOpen ? (
//             <DashboardDetail />
//           ) : (
//               renderWelcome
//             )}
//         </div>
//         <div className="copyright">
//           <Copyright />
//         </div>
//       </main>
//     </div>
//   );
// };

// export default WithLoading(DashboardHR);

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

import DiscardPopup from "../../components/DiscardPopup/index";
import AddLearningPath from "../../images/AddLearningPath.svg";
import LearningPath from "../LearningPath/index";
import { useStyles } from "./style";
import WithLoading from "../../hoc/WithLoading";
import Actions from "../../store/actions";
import DashboardDetail from "../Chart";
import TopNav from "../../components/TopNav";
import Copyright from "../../components/Copyright";

import DashboardMatrix from "../../components/Dashboard/DashboardMatrix";
import PopularStuff from "../../components/Carousel/PopularStuff";

const DashboardHR = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const loginState = useSelector((res) => res.loginState);
  const learningPathState = useSelector((state) => state.learningPathState);
  const userName = getOr("User Name", "user.fullName", loginState);
  const { assignedCources, pathModelOpen,dashStats,managerPopularStuff,isLoading } = learningPathState;

  // const showDashboard = (assignedCources.assignedLearningPaths
  //   && assignedCources.assignedLearningPaths.length ?
  //   true : false);
  var showDashboard = false;

  for (var i in dashStats) {
      if (dashStats[i] !== 0) {
        showDashboard = true;
        break;
      }
  }

  useEffect(() => {
    dispatch(
      Actions.learningPathActions.getAssignedLearningPath(
        loginState.user.username
      )
    );
    dispatch(Actions.learningPathActions.clearCreateLpFormFields());
    dispatch(Actions.learningPathActions.getManagerStats(loginState.user.username));
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
    const data={
      totalCardDetail:{
        heading:"Assigned Learning Path",
        Total:dashStats.totalLearningPathAssigned
      },
      Completed:dashStats.totalLearningPathCompleted,
      Inprogress:dashStats.totalLearningPathInProgress,
      Overdue:dashStats.totalLearningPathExpired
    };
    return (
      <>
        <DashboardMatrix data={data} />
        <div
          style={{
            width: "1060px",
            height: "180px",
            margin: "20px",
          }}
        >
          <PopularStuff managerPopularStuff={managerPopularStuff}/>
        </div>
      </>
    );
  };

  return (
    <div>
      <TopNav>{showDashboard ? modalBtn : ""}</TopNav>
      <main className="main-content">
        <div className={classes.toolbar} />
        <div className="container">
          <h1>Kanchan Tyagi</h1>
          {showDashboard && !pathModelOpen ? (
            //<DashboardDetail />
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

export default WithLoading(DashboardHR);