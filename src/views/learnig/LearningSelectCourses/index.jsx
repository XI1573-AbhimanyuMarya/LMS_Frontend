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

import ItemsCarousel from 'react-items-carousel';
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import LearningPathCard from '../../../components/Card/LearningPathCard';
import LearningCoursesTable from '../../../components/Table/LearningCoursesTable';
import ArrowBackIos from '../../../images/ArrowBackIos.svg';
import Button from '@material-ui/core/Button';

const SelectCourses = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const learningPathState = useSelector(state => state.learningPathState);
  const { courses, filteredCoursesList, isLoading, learningPathName, firstNextClicked, courseIdArr } = learningPathState;
  const [selectedCoursesArr, setSelectedCoursesArr] = useState([]);
  const [touch, setTouch] = useState(false);
  const loginState = useSelector(res => res.loginState);
  const { mycourses } = learningPathState;
  
  const [lpId,setLpId]=useState(0);//check
  
  console.log(mycourses, learningPathState, "learn");
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
  let selectedLp;
  if (mycourses && mycourses.length > 0) {
    completed = mycourses.filter(course => course.percentCompleted === 100)
    inprogress = mycourses.filter(course => course.percentCompleted < 100)
    selectedLp=mycourses.find(course=> course.learningPath.learningPathId==lpId);
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
  const LearningPathDesc=()=>{
    return (
      <>
        <Button size="small" onClick={()=>setLpId(0)} style={{textTransform:"lowercase",opacity:0.7}} startIcon={<img src={ArrowBackIos}/>}>
          Back
        </Button>
        <div style={{maxWidth:"300px",margin:"10px 0px 0px"}}>
          <LearningPathCard selectedLp={selectedLp} />
        </div>
      </>
    );
  }
  const MyLearningPaths=()=>{
    console.log(completed,"completedLp");
    return (
      <>
        <Typography variant="h6" className={classes.headerText}>
          {LEARNING_PATH_LABELS.COURSE_CATALOG1}
        </Typography>
        <Box alignItems="center" style={{margin:"10px 50px 0px 0px"}}>
          {isLoading && completedCourse?.length === 0 && <CourseSkelton1 /> && completed?.length}
          <MyCarosals coursesList={completedCourse} lpList={completed} setLpId={setLpId}/>
        </Box>
      </>
    );
  }
  const MyLearningPathTable=()=>{
    return (<>
      <div className={classes.lptbldiv}>
        <table className={classes.table}>
          <thead className={classes.tblheading}>
            <tr>
              <th>Learning Path Name</th>
              <th>Level</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Learning Rate</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className={classes.tblbody}>
            {isLoading && !inprogress && <CourseSkelton />}
            <Carosals coursesList={inprogress} setLpId={setLpId} />
          </tbody>
        </table>
      </div>  
      
    </>);
  }
  return (
    <React.Fragment>
      <TopNav>
      </TopNav>
      <main className="main-content">
        <div className={classes.toolbar} />
        <div className="container">
          <Box className={classes.catalogContainer} display="flex-inline" justifyContent="center" style={{margin:"15px 20px"}}>
            {lpId!==0 ? <LearningPathDesc/> : <MyLearningPaths/> }
          </Box>
        </div>
        {lpId!==0 ? <LearningCoursesTable lpId={lpId} withRate={true}/> : <MyLearningPathTable/> }
        <div className="copyright" style={{border:"1px solid #d3d3d3"}}>
          <Copyright />
        </div>
      </main>
    </React.Fragment>
  );
}

export default WithLoading(SelectCourses);