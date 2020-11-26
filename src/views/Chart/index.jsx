import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Graph from './graph/Graph';
import Carosals1 from './Chartview/index';
import Actions from '../../store/actions';
import CourseSkelton1 from '../../components/Skelton/MyCourseSkelton';
import { useStyles } from './style';
import { LEARNING_PATH_LABELS } from '../../modules/constants';


const DataCard = (props) => {
  const classes = useStyles();
  const { heading, value, color } = props
  return (
    <Paper className={classes.rectangle1}>
      <Typography style={{ color: "#000000" }}>
        {heading}
      </Typography>
      <Typography variant="caption" className={classes.cardValue} style={{ color: color }}>
        {`${value} %`}
      </Typography>
    </Paper>
  )
}
const DashboardDetail = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const learningPathState = useSelector(state => state.learningPathState);
  const { courses, filteredCoursesList, isLoading, courseIdArr } = learningPathState;
	const [selectedCoursesArr, setSelectedCoursesArr] = useState([]);


  useEffect(() => {
    if (courseIdArr?.length === 0) {
      dispatch(Actions.learningPathActions.fetchAllCourses());
    } else {
      setSelectedCoursesArr(courseIdArr)
    }
  }, []);



  const coursesList = filteredCoursesList
    ? filteredCoursesList?.length > 0
      ? filteredCoursesList
      : ''
    : courses;

  const coursesList1 = filteredCoursesList
    ? filteredCoursesList?.length > 0
      ? filteredCoursesList
      : ''
    : courses;
  return (
    <div>
      <div style={{backgroundColor:"white", borderRadius:"8px"}}>
      <div style={{ display: "flex", height: "20%" }}>
        <Paper className={classes.rectangle1} style={{ display: "flex", flexDirection: "column" }}>
          <Typography style={{ color: "#000000", marginLeft: "10px", marginTop: "10px" }}>
            Assigned Learning Path
						</Typography>
						888
					</Paper>
        <Paper className={classes.rectangle} style={{ color: "#3c8200" }}>
          88
						<Typography style={{ color: "#3c8200", fontSize: "25px" }}>
            %
						</Typography>
          <Typography style={{ color: "rgba(0, 0, 0, 0.6)", marginLeft: "10px" }}>
            Completed
						</Typography>
        </Paper>
        <Paper className={classes.rectangle} style={{ color: "#f9b900" }}>
          88
						<Typography style={{ color: "#f9b900", fontSize: "25px" }}>
            %
						</Typography>
          <Typography style={{ color: "rgba(0, 0, 0, 0.6)", marginLeft: "10px" }}>
            In-progress
						</Typography>
        </Paper>
        <Paper className={classes.rectangle} style={{ color: "#e76600" }}>
          88
						<Typography style={{ color: "#e76600", fontSize: "25px" }}>
            %
						</Typography>
          <Typography style={{ color: "rgba(0, 0, 0, 0.6)", marginLeft: "10px" }}>
            Overdue
						</Typography>
        </Paper>
      </div>
      <Box marginRight="10px" mt={2} className={classes.graph}>
        <Graph></Graph>
      </Box>
      </div>
      <Box className={classes.catalogContainer} display="flex-inline" justifyContent="center">
        <Box alignItems="flex-start" py={2}>
          <Typography variant="h6" style={{ color: "#621d58", fontSize:"18px" }}>
            {LEARNING_PATH_LABELS.CHART_CATALOG}
          </Typography>
        </Box>
        <Box alignItems="center" >
          {isLoading && coursesList1?.length === 0 && <CourseSkelton1 />}
          <Carosals1 coursesList={coursesList1} />
        </Box>
      </Box>
    </div>
  );
}

export default DashboardDetail;
