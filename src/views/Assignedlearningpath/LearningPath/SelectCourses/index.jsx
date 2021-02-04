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
import TextField from "@material-ui/core/TextField";

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
    filteredLearningPath,
    allLearningPath,
  } = learningPathState;
  const { mycourses } = learningPathState;
  const [selectedCoursesArr, setSelectedCoursesArr] = useState([]);
  const [touch, setTouch] = useState(false);
  const loginState = useSelector((res) => res.loginState);

  useEffect(() => {
    dispatch(Actions.learningPathActions.getLearningPath(loginState.user.id));
    // if (mycourses.length === 0) {
    //   dispatch(Actions.learningPathActions.fetchAllCourses());
    // } else {
    //   setSelectedCoursesArr(mycourses)
    // }
  }, [dispatch, loginState.user.id]);

  // let filterCourses = [];
  // const changeHandler = (e) => {
  //   const { value } = e.target;
  //   const searchValue = value.toLowerCase();
  //   if (courses?.length > 0) {
  //     filterCourses = courses.filter(function (el) {
  //       return (
  //         el.name.toLowerCase().includes(searchValue) ||
  //         el.category.name.toLowerCase().includes(searchValue) ||
  //         el.competency.name.toLowerCase().includes(searchValue)
  //       );
  //     });
  //     dispatch(Actions.learningPathActions.getFilteredCourses(filterCourses));
  //   }
  // };

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

  let filterLearningPath = [];
  const changeHandlerLearning = (e) => {

    const { value } = e.target;
    const searchValue = value.toLowerCase();
    if (allLearningPath?.length > 0) {
      filterLearningPath = allLearningPath.filter(function (el) {
        return (
          el.name.toLowerCase().includes(searchValue) ||
          el.description.toLowerCase().includes(searchValue)
        );
      });
      dispatch(Actions.learningPathActions.getFilteredLearningPath(filterLearningPath));
    }
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

  const LearningPathList = filteredLearningPath
    ? filteredLearningPath?.length > 0
      ? filteredLearningPath
      : ""
    : allLearningPath;

  return (
    <React.Fragment>
      <Box alignItems="flex-start" style={{ padding: "5px 10px 10px" }}>
        <Typography variant="h6" className={classes.head}>
          {LEARNING_PATH_LABELS.COURSE_CATALOG2}
        </Typography>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <TextField
            id="standard-search"
            label={LEARNING_PATH_LABELS.SEARCH_LEARNING_PATH}
            type="search"
            variant="outlined"
            className={classes.searchField}
            name="searchName"
            size="small"
            onChange={changeHandlerLearning}
          />
        </div>
      </Box>
      <Carosals
        coursesList={LearningPathList}
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
