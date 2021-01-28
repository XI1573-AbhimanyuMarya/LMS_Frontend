import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Carosals from "./Carosals/index";
import Actions from "../../../../store/actions";
import { useStyles } from "./style";
import Box from "@material-ui/core/Box";
import { LEARNING_PATH_LABELS } from "../../../../modules/constants";
import LearningPath from "../../../../views/LearningPath/index";
import DiscardPopup from "../../../../components/DiscardPopup/index";

const SelectAssignedPath = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const learningPathState = useSelector((state) => state.learningPathState);
  const {
    courses,
    filteredCoursesList,
    isLoading,
    learningPathName,
    firstNextClicked,
    allLearningPath,
  } = learningPathState;
  const { mycourses } = learningPathState;
  const [selectedCoursesArr, setSelectedCoursesArr] = useState([]);
  const [touch, setTouch] = useState(false);
  const loginState = useSelector((res) => res.loginState);
  
  useEffect(() => {
    dispatch(Actions.learningPathActions.getLearningPath(loginState.user.id));
    if (mycourses.length === 0) {
      dispatch(Actions.learningPathActions.fetchAllCourses());
    } else {
      setSelectedCoursesArr(mycourses)
    }
  }, []);

  let filterCourses = [];
  const changeHandler = (e) => {
    const { value } = e.target;
    const searchValue = value.toLowerCase();
    if (courses?.length > 0) {
      filterCourses = courses.filter(function (el) {
        return (
          el.name.toLowerCase().includes(searchValue) ||
          el.category.name.toLowerCase().includes(searchValue) ||
          el.competency.name.toLowerCase().includes(searchValue)
        );
      });
      dispatch(Actions.learningPathActions.getFilteredCourses(filterCourses));
    }
  };
  
  let selectedCourses = [];
  const onCourseClickHandler = (courseId) => {
    if (courseId !== "") {
      const idArr = selectedCoursesArr;
      const index = idArr.indexOf(courseId);

      if (index > -1) {
        idArr.splice(index, 1);
      } else {
        idArr.push(courseId);
      }
      setSelectedCoursesArr(idArr);

      selectedCourses = allLearningPath.map(function (el) {
        if (el.id === courseId) {
          !el.selected ? (el.selected = true) : (el.selected = false);
        }
        return el;
      });
      dispatch(
        Actions.learningPathActions.getSelectedCourses(
          selectedCourses,
          selectedCoursesArr
        )
      );
    }
  };
  
  // const onChangeHandler = (e) => {
  //   const pathName = e.target.value;
  //   setTouch(true);
  //   dispatch(Actions.learningPathActions.getLearningPathName(pathName));
  // };

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

  return (
    <React.Fragment>
      <Box alignItems="flex-start" style={{ padding: "5px 10px 10px" }}>
        <Typography variant="h6" className={classes.head}>
          {LEARNING_PATH_LABELS.COURSE_CATALOG2}
        </Typography>
      </Box>
      <Carosals
        coursesList={allLearningPath}
        handleCourseClick={(id) => onCourseClickHandler(id)}
      />
      <LearningPath
        handleClose={closeHandler}
        handleClosePath={handleClosePathHandler}
      />
      <DiscardPopup discardHandler={discardHandler} />
    </React.Fragment>
  );
};

export default SelectAssignedPath;
