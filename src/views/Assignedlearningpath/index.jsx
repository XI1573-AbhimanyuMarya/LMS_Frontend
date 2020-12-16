import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Actions from '../../store/actions';
import CourseSkelton from '../../components/Skelton/CourseSkelton';
import { useStyles } from './style';
import TopNav from '../../components/TopNav';
import Copyright from '../../components/Copyright';
import WithLoading from '../../hoc/WithLoading';
import { Button } from '@material-ui/core';
import DiscardPopup from '../../components/DiscardPopup';
import LearningPath from './LearningPath/index';
import { getOr } from 'lodash/fp';
import Carosals from './Carosals/index';

const AssignedLearningPathMain = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const learningPathState = useSelector(state => state.learningPathState);
  const { courses, filteredCoursesList, isLoading, learningPathName, firstNextClicked, courseIdArr } = learningPathState;
  const [selectedCoursesArr, setSelectedCoursesArr] = useState([]);
  const [touch, setTouch] = useState(false);
  const loginState = useSelector(res => res.loginState);
  const userName = getOr("User Name", "user.fullName", loginState);
  const { assignedCources, pathModelOpen } = learningPathState;

  // useEffect(() => {
  //   dispatch(Actions.learningPathActions.getAssignedLearningPath(loginState.user.username))
  // }, [])

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
    console.log(closeMainModel);
    dispatch(Actions.learningPathActions.discardModelOpen(false));
    if (closeMainModel) {
      dispatch(Actions.learningPathActions.pathModelOpen(false));
    }
  };
  useEffect(() => {
    if (courseIdArr?.length === 0) {
      // dispatch(Actions.learningPathActions.getAssignedLearningPath(loginState.user.username));
      dispatch(Actions.learningPathActions.fetchAllCourses());
    } else {
      setSelectedCoursesArr(courseIdArr)
    }
  }, [pathModelOpen]);

  var headings = courses
  var headresult = headings.map((item) => { return item.category });
  var headresult1 = headresult.map((item) => { return item.name });
  var set1 = new Set(headresult1)
  let finalset = Array.from(set1)
  let finaldata = []


  for (var i = 0; i < finalset.length; i++) {
    var result = headings.filter(item => item.category.name == finalset[i]).map((name) => { return name })
    finaldata.push({
      name: finalset[i],
      courses: result
    })
  }

  return (
    <div>
      <TopNav>
      </TopNav>
      <main className="main-content">
        <div className={classes.toolbar} />
        <div className="container">
          <Box className={classes.catalogContainer} display="flex-inline" justifyContent="center" p={3} style={{ position: "unset !important" }}>
            {!pathModelOpen && finaldata.map(item => (
              <div key={item.name}>
                <Box component="div" m="auto">
                  <Button type="button" onClick={handleClickOpen} >
                    {item.name}
                  </Button>
                </Box>
                <Box alignItems="center">
                  {isLoading && item?.length === 0 && <CourseSkelton />}
                  <Carosals coursesList={item.courses} />
                  {/* <Carosals coursesList={item.courses} handleCourseClick={(id) => onCourseClickHandler(id)} /> */}
                </Box>
              </div>
            ))}
            <LearningPath
              handleClose={closeHandler}
              handleClosePath={handleClosePathHandler}
            />
            <DiscardPopup discardHandler={discardHandler} />
          </Box>
          <div className="copyright">
            <Copyright />
          </div>
        </div>
      </main>
    </div>
  );
}

export default WithLoading(AssignedLearningPathMain);