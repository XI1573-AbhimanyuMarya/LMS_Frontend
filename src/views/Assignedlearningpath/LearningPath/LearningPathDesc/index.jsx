import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@material-ui/core/Box';
import { useStyles } from '../CreateLearningPath/style';
import Actions from '../../../../store/actions';
import WithLoading from '../../../../hoc/WithLoading';
import TopNav from '../../../../components/TopNav';

 import Copyright from '../../../../components/Copyright';
 import LearningPathCard from '../../../../components/Card/LearningPathCard';
 import LearningCoursesTable from '../../../../components/Table/LearningCoursesTable';
 import {BackButton} from '../../../../components/Button';

const LearningPathDesc = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const learningPathState = useSelector(state => state.learningPathState);
  const loginState = useSelector(res => res.loginState);
  const { handleClose, handleClosePath,selectedLp } = props;

  const backBtnHandler=()=>{
    dispatch(Actions.learningPathActions.selectLearningPath({}));
  }
  console.log(selectedLp.learningPath.learningPathId,"length")
  return (
    <React.Fragment>
      <TopNav />
      <main className="main-content">
        <div className={classes.toolbar} />
        <div className="container">
          <Box component='div' className={classes.layout} style={{margin:"10px 0px 10px 25px"}}>
            <BackButton backBtnHandler={backBtnHandler} />
             <div style={{maxWidth:"300px",margin:"10px 0px"}}>
               <LearningPathCard selectedLp={selectedLp} />
             </div>
          </Box>
        </div>
        <LearningCoursesTable 
          lpId={selectedLp.learningPath.learningPathId} 
          learningPathEmployeesId={selectedLp.learningPathEmployeesId}
          withRate={false}/>
        <div className="copyright" style={{border:"1px solid #d3d3d3"}}>
          <Copyright />
        </div>
      </main>
    </React.Fragment>
  );
}

export default WithLoading(LearningPathDesc);