import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import { Grid } from '@material-ui/core';
import Carosals from './Carosals/index';
import MyCarosals from './MyCarosals';
import Actions from '../../../store/actions';
import CourseSkelton from '../../../components/Skelton/CourseSkelton';
import CourseSkelton1 from '../../../components/Skelton/MyCourseSkelton';
import { useStyles } from './style';
import { LEARNING_PATH_LABELS } from '../../../modules/constants';
import WithLoading from '../../../hoc/WithLoading';
import TopNav from '../../../components/TopNav';
import Copyright from '../../../components/Copyright';

const SelectCourses = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const learningPathState = useSelector(state => state.learningPathState);
  const { courses, filteredCoursesList, isLoading, learningPathName, firstNextClicked, courseIdArr } = learningPathState;
  const [selectedCoursesArr, setSelectedCoursesArr] = useState([]);
  const [touch, setTouch] = useState(false);
  const loginState = useSelector(res => res.loginState);
  const { mycourses } = learningPathState;

  const logoutUser = () => {
    dispatch(Actions.loginActions.logout());
  }
  /**
   * function to fetch all courses initial time
   */
  useEffect(() => {
    dispatch(Actions.learningPathActions.getMyLearningPath(loginState.user.username));
    if (courseIdArr?.length === 0) {
      dispatch(Actions.learningPathActions.fetchAllCourses());
    } else {
      setSelectedCoursesArr(courseIdArr)
    }
  }, []);
  let completed, inprogress;
  if (mycourses && mycourses.length > 0) {
    completed = mycourses.filter(course => course.percentCompleted === 100)
    inprogress = mycourses.filter(course => course.percentCompleted < 100)
  }


  const coursesList = filteredCoursesList
    ? filteredCoursesList?.length > 0
      ? filteredCoursesList
      : ''
    : courses;

  const completedCourse = filteredCoursesList
    ? filteredCoursesList?.length > 0
      ? filteredCoursesList
      : ''
    : courses;


  return (
    <React.Fragment>
       <TopNav>
      </TopNav>
      <main className="main-content">
        <div className={classes.toolbar} />
        <div className="container">
      <Box className={classes.catalogContainer} display="flex-inline" justifyContent="center">
        <Box alignItems="flex-start" py={2} pl={5}>
          <Typography variant="h6" className={classes.headerText}>
            {LEARNING_PATH_LABELS.COURSE_CATALOG1}
          </Typography>
        </Box>
        <Box alignItems="center">
          {isLoading && completedCourse?.length === 0 && <CourseSkelton1 />}
          <MyCarosals coursesList={completedCourse} />
        </Box>
        <Box alignItems="flex-start" py={2} pl={5}>
          <Typography variant="h6" className={classes.headerText}>
            {LEARNING_PATH_LABELS.COURSE_CATALOG2}
          </Typography>
        </Box>
        <Box alignItems="center" mb={2}>
          {isLoading && !inprogress && <CourseSkelton />}
          <Carosals coursesList={inprogress} />
        </Box>
      </Box>
      <div className="copyright">
            <Copyright />
          </div>
        </div>
      </main>
    </React.Fragment>
  );
}

export default WithLoading(SelectCourses);