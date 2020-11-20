import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import { Grid } from '@material-ui/core';
import Carosals from './Carosals/index';
// import Carosals1 from './MyCarosals/index';
import Actions from '../../store/actions';
import CourseSkelton from '../../components/Skelton/CourseSkelton';
// import CourseSkelton1 from '../../../components/Skelton/MyCourseSkelton';
import { useStyles } from './style';
import { LEARNING_PATH_LABELS } from '../../modules/constants';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import CardMedia from '@material-ui/core/CardMedia';
import XebiaLogo from '../../images/Logo.svg'
import User from '../../components/User';
import { Link, withRouter } from 'react-router-dom'
import Scrollbars from 'react-custom-scrollbars';

const SelectCourses = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const learningPathState = useSelector(state => state.learningPathState);
  const { courses, filteredCoursesList, isLoading, learningPathName, firstNextClicked, courseIdArr } = learningPathState;
  const [selectedCoursesArr, setSelectedCoursesArr] = useState([]);
  const [touch, setTouch] = useState(false);
  const loginState = useSelector(res => res.loginState);


  const logoutUser = () => {
    dispatch(Actions.loginActions.logout());
  }
  /**
   * function to fetch all courses initial time
   */
  useEffect(() => {
    if (courseIdArr?.length === 0) {
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
    <React.Fragment>
      <Scrollbars>
        <Box className={classes.catalogContainer} display="flex-inline" justifyContent="center" p={3} >
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
                  <Carosals coursesList={item.courses} />
                </Box>
              </>
            )
            return Item
          })}
        </Box>
      </Scrollbars>
    </React.Fragment>
  );
}

export default SelectCourses;