import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Carosals1 from "./../Chartview/index1";
import Actions from "../../../store/actions";
import CourseSkelton1 from "../../../components/Skelton/MyCourseSkelton";
import { useStyles } from "./style";
import { LEARNING_PATH_LABELS } from "../../../modules/constants";
import LearningPathCard from "../../../components/Card/LearningPathCard";
import TotalCard from "../../../components/Card/TotalCard";
import StatusWiseCard from "../../../components/Card/StatusWiseCard";
import { BackButton } from "../../../components/Button";

import MyCarosals from "../../learnig/LearningSelectCourses/MyCarosals";
import LearningCoursesTable from "../../../components/Table/LearningCoursesTable";
const DataCard = (props) => {
  const classes = useStyles();
  const { heading, value, color } = props;
  return (
    <Paper className={classes.rectangle1}>
      <Typography style={{ color: "#000000" }}>{heading}</Typography>
      <Typography
        variant="caption"
        className={classes.cardValue}
        style={{ color: color }}
      >
        {`${value} %`}
      </Typography>
    </Paper>
  );
};

const EmployeeDashboardDetail = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const learningPathState = useSelector((state) => state.learningPathState);
  const {
    courses,
    filteredCoursesList,
    isLoading,
    courseIdArr,
    mycourses,
    selectedLp,
  } = learningPathState;
  const [selectedCoursesArr, setSelectedCoursesArr] = useState([]);

  useEffect(() => {
    if (courseIdArr?.length === 0) {
      dispatch(Actions.learningPathActions.fetchAllCourses());
    } else {
      setSelectedCoursesArr(courseIdArr);
    }
  }, []);

  const [lpId, setLpId] = useState(0);
  const [disable, setDisable] = useState(false);
  const [selectedProgramToStart, setSelectedProgramToStart] = useState(false);

  const courseClicked = (val, x) => {
    console.log(val, "val in function", x);
    setSelectedProgramToStart(val);
    // console.log(selectedProgramToStart, "SelectedProgramToStart");
  };
  const coursesList1 = mycourses
    ? mycourses?.length > 0
      ? mycourses
      : ""
    : courses;

  let completed;

  if (mycourses && mycourses.length > 0) {
    completed = mycourses.filter((course) => course.percentCompleted === 100);
  }

  const completedCourse = mycourses
    ? mycourses?.length > 0
      ? mycourses
      : ""
    : courses;
  const backBtnHandler = () => {
    setSelectedProgramToStart(false);
    setDisable(false);
  };

  console.log(selectedProgramToStart, "manananana");
  const LearningPathDesc = () => {
    console.log("not completed");
    return (
      <>
        <BackButton backBtnHandler={backBtnHandler} />
        <div style={{ maxWidth: "300px", margin: "10px 0px 0px" }}>
          <LearningPathCard selectedLp={selectedProgramToStart || selectedLp} />
        </div>
      </>
    );
  };
  const MyLearningPaths = () => {
    return (
      <>
        {((typeof completed !== "undefined" && completed.length !== 0) ||
          !selectedProgramToStart) && (
          <Typography variant="h6" className={classes.headerText}>
            {LEARNING_PATH_LABELS.COURSE_CATALOG1}
          </Typography>
        )}
        <Box alignItems="center" style={{ margin: "10px 50px 0px 0px" }}>
          {isLoading &&
            completedCourse?.length === 0 && <CourseSkelton1 /> &&
            completed?.length}
          <MyCarosals
            coursesList={completedCourse}
            lpList={completed}
            setLpId={setLpId}
            setDisable={setDisable}
          />
        </Box>
      </>
    );
  };

  return (
    <div>
      <div style={{ backgroundColor: "white", borderRadius: "8px" }}>
        <div style={{ display: "flex", height: "20%" }}>
          {(Object.keys(selectedLp).length !== 0 &&
            disable &&
            selectedLp.constructor === Object) ||
          selectedProgramToStart ? (
            <></>
          ) : (
            <>
              <TotalCard />
              <StatusWiseCard />
            </>
          )}

          {/* <Paper
            className={classes.rectangle1}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <Typography
              style={{
                color: "#000000",
                marginLeft: "10px",
                marginTop: "10px",
              }}
            >
              Assigned Learning Path
            </Typography>
            888
          </Paper>
          <Paper className={classes.rectangle} style={{ color: "#3c8200" }}>
            88
            <Typography style={{ color: "#3c8200", fontSize: "25px" }}>
              %
            </Typography>
            <Typography
              style={{ color: "rgba(0, 0, 0, 0.6)", marginLeft: "10px" }}
            >
              Completed
            </Typography>
          </Paper>
          <Paper className={classes.rectangle} style={{ color: "#f9b900" }}>
            88
            <Typography style={{ color: "#f9b900", fontSize: "25px" }}>
              %
            </Typography>
            <Typography
              style={{ color: "rgba(0, 0, 0, 0.6)", marginLeft: "10px" }}
            >
              In-progress
            </Typography>
          </Paper>
          <Paper className={classes.rectangle} style={{ color: "#e76600" }}>
            88
            <Typography style={{ color: "#e76600", fontSize: "25px" }}>
              %
            </Typography>
            <Typography
              style={{ color: "rgba(0, 0, 0, 0.6)", marginLeft: "10px" }}
            >
              Overdue
            </Typography>
          </Paper> */}
        </div>
      </div>
      <Box
        className={classes.catalogContainer}
        display="flex-inline"
        justifyContent="center"
      >
        {(completed.length > 0 || selectedProgramToStart) && (
          <div>
            <div className={classes.toolbar} />
            <div className="container">
              <Box
                className={classes.catalogContainer}
                display="flex-inline"
                justifyContent="center"
                style={{ margin: "15px 20px" }}
              >
                {(Object.keys(selectedLp).length !== 0 &&
                  disable &&
                  selectedLp.constructor === Object) ||
                selectedProgramToStart ? (
                  <LearningPathDesc />
                ) : (
                  <MyLearningPaths />
                )}
              </Box>
            </div>

            {(Object.keys(selectedLp).length !== 0 &&
              selectedLp.constructor === Object &&
              disable) ||
            selectedProgramToStart ? (
              <LearningCoursesTable
                lpId={
                  selectedProgramToStart.learningPath
                    ? selectedProgramToStart.learningPath.learningPathId
                    : selectedLp.learningPath.learningPathId
                }
                learningPathEmployeesId={
                  selectedProgramToStart.learningPathEmployeesId
                    ? selectedProgramToStart.learningPathEmployeesId
                    : selectedLp.learningPathEmployeesId
                }
                withRate={true}
                disable={disable}
              />
            ) : (
              <></>
            )}
          </div>
        )}
        {!selectedProgramToStart && !disable ? (
          <Box style={{ margin: "15px 30px" }}>
            {/* <Box alignItems="flex-start" py={2}>
              <Typography
                variant="h6"
                style={{ color: "#621d58", fontSize: "18px" }}
              >
                {LEARNING_PATH_LABELS.LEARNING_PATH_TAKEN}
              </Typography>
            </Box> */}
            <Box alignItems="center">
              {isLoading && coursesList1?.length === 0 && <CourseSkelton1 />}
              <Carosals1
                coursesList={coursesList1}
                handleCourseClick={courseClicked}
              />
            </Box>
          </Box>
        ) : (
          <></>
        )}
      </Box>
    </div>
  );
};

export default EmployeeDashboardDetail;
