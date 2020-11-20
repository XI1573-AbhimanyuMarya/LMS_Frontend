import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
// import Carosals from '../LearningPath/SelectCourses/Carosals';
import Carosals from './Carosals/index';
import Actions from '../../store/actions';
import CourseSkelton from '../../components/Skelton/CourseSkelton';
import { useStyles } from './style';

import WithLoading from '../../hoc/WithLoading';

const AssignedLearningPath = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const learningPathState = useSelector(state => state.learningPathState);
  const { courses, filteredCoursesList, isLoading, learningPathName, firstNextClicked, courseIdArr } = learningPathState;
  const [selectedCoursesArr, setSelectedCoursesArr] = useState([]);
  const [touch, setTouch] = useState(false);
  const loginState = useSelector(res => res.loginState);
  const { assignedCources } = learningPathState;


  const onCourseClickHandler = (courseId) => {
    console.log(courseId);
  }
  const logoutUser = () => {
    dispatch(Actions.loginActions.logout());
  }
  /**
   * function to fetch all courses initial time
   */
  useEffect(() => {
    if (courseIdArr?.length === 0) {
      // dispatch(Actions.learningPathActions.getAssignedLearningPath(loginState.user.username));
      dispatch(Actions.learningPathActions.fetchAllCourses());
    } else {
      setSelectedCoursesArr(courseIdArr)
    }
  }, []);

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
      <Box className={classes.catalogContainer} display="flex-inline" justifyContent="center" p={3} style={{ position: "unset !important" }}>
        {finaldata.map(item => {
          var Item = (
            <>
              <Box alignItems="flex-start" py={2} pl={5}>
                <Typography variant="h6" style={{ color: "#621d58" }}>
                  {item.name}
                </Typography>
              </Box>
              <Box alignItems="center">
                {isLoading && item?.length === 0 && <CourseSkelton />}
                <Carosals coursesList={item.courses}x />
                {/* <Carosals coursesList={item.courses} handleCourseClick={(id) => onCourseClickHandler(id)} /> */}
              </Box>
            </>
          )
          return Item
        })}
      </Box>
    </div>
  );
}

export default WithLoading(AssignedLearningPath);