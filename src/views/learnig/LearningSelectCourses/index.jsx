import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
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
import LearningPathCard from '../../../components/Card/LearningPathCard';
import LearningCoursesTable from '../../../components/Table/LearningCoursesTable';
import {BackButton} from '../../../components/Button'; 

const SelectCourses = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const learningPathState = useSelector(state => state.learningPathState);
  const { courses, filteredCoursesList, isLoading, learningPathName, firstNextClicked, courseIdArr ,selectedLp } = learningPathState;
  const [selectedCoursesArr, setSelectedCoursesArr] = useState([]);
  const [touch, setTouch] = useState(false);
  const loginState = useSelector(res => res.loginState);
  const { mycourses } = learningPathState;
  
  const [lpId,setLpId]=useState(0);
  const [disable,setDisable]=useState(false);
  
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
    dispatch(Actions.learningPathActions.selectLearningPath({}));
  }, []);
  let completed, inprogress;
  //let selectedLp;
  if (mycourses && mycourses.length > 0) {
    completed = mycourses.filter(course => course.approvalStatus==="APPROVED");//course.percentCompleted === 100)
    inprogress = mycourses.filter(course => course.approvalStatus!=="APPROVED");
    //selectedLp=mycourses.find(course=> course.learningPath.learningPathId==lpId);
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
  const backBtnHandler=()=>{
    //setLpId(0);
    dispatch(Actions.learningPathActions.selectLearningPath({}));
    setDisable(false);
  }
  const LearningPathDesc=()=>{
    return (
      <>
        <BackButton backBtnHandler={backBtnHandler} />
        <div style={{maxWidth:"300px",margin:"10px 0px 0px"}}>
          <LearningPathCard selectedLp={selectedLp} />
        </div>
      </>
    );
  }
  const MyLearningPaths=()=>{
    return (
      <>
        {typeof completed !== 'undefined' && completed.length!==0 && <Typography variant="h6" className={classes.headerText}>{LEARNING_PATH_LABELS.COURSE_CATALOG1}</Typography>}
        <Box alignItems="center" style={{margin:"10px 50px 0px 0px"}}>
          {isLoading && completedCourse?.length === 0 && <CourseSkelton1 /> && completed?.length}
          <MyCarosals coursesList={completedCourse} lpList={completed} setLpId={setLpId} setDisable={setDisable}/>
        </Box>
      </>
    );
  }
  const MyLearningPathTable=()=>{
    return typeof inprogress !== 'undefined' && inprogress.length!==0 ? (
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
      
    ) : "";
  }
  return (
    <React.Fragment>
      <TopNav>
      </TopNav>
      <main className="main-content">
        <div className={classes.toolbar} />
        <div className="container">
          <Box className={classes.catalogContainer} display="flex-inline" justifyContent="center" style={{margin:"15px 20px"}}>
            {/* {lpId!==0 ? <LearningPathDesc/> : <MyLearningPaths/> } */}
            {Object.keys(selectedLp).length!==0 && selectedLp.constructor===Object ? <LearningPathDesc/> : <MyLearningPaths/>}
          </Box>
        </div>
        {/* {lpId!==0 ? <LearningCoursesTable lpId={lpId} learningPathEmployeesId={selectedLp.learningPathEmployeesId} withRate={true} disable={disable}/> : <MyLearningPathTable/> } */}
        {Object.keys(selectedLp).length!==0 && selectedLp.constructor===Object ? <LearningCoursesTable lpId={selectedLp.learningPath.learningPathId} learningPathEmployeesId={selectedLp.learningPathEmployeesId} withRate={true} disable={disable}/> : <MyLearningPathTable/>}
        <div className="copyright" style={{border:"1px solid #d3d3d3"}}>
          <Copyright />
        </div>
      </main>
    </React.Fragment>
  );
}

export default WithLoading(SelectCourses);