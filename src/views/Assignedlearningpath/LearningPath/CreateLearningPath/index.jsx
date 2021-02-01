import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import Container from '@material-ui/core/Container';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Icon from "@material-ui/core/Icon";
import CloseIcon from '@material-ui/icons/Close';
import CardMedia from '@material-ui/core/CardMedia';
import Box from '@material-ui/core/Box';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import SelectCourses from '../SelectCourses';
import SelectUsers from '../SelectUsers';
import SetDuration from '../SetDuration';
import AddLearningPath from '../../../../images/AddLearningPath.svg';
import { useStyles, QontoConnector } from './style';
import Actions from '../../../../store/actions';
import { STEPS1, MESSAGES, LEARNING_PATH_LABELS, BUTTONS } from '../../../../modules/constants';
import WithLoading from '../../../../hoc/WithLoading';
import { error } from '../../../../utils/notifications';
import TopNav from '../../../../components/TopNav';
import CircularProgress from '@material-ui/core/CircularProgress';
import AssingedCourses from '../../../../images/assignLPsucess.png'

import SucessPage from '../../LearningPath/SucessPage/SucessPage';

const steps = STEPS1;
const getStepContent = (step) => {
  switch (step) {
    case 0:
      return <SelectCourses />;
    case 1:
      return <SelectUsers />;
    case 2:
      return <SetDuration />;
    default:
      throw new Error(MESSAGES.UNKNOWN_STEP);
  }
}

const AssignedCreateLearningPath = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const learningPathState = useSelector(state => state.learningPathState);
  const loginState = useSelector(res => res.loginState);
  const [activePathStep, setActivePathStep] = useState(0);
  const { learningPathName,learningPathDes , courseIdArr, userIdArr, learningPathDuration, status } = learningPathState;
  const { user } = loginState;

  const closeHandler=()=>{
    setActivePathStep(0);
  }

  const handleNext = () => {
    if (activePathStep === 0 && courseIdArr?.length > 0) {
      setActivePathStep(activePathStep + 1);
    } else if (activePathStep === 0 && courseIdArr?.length === 0) {
      error(MESSAGES.PLEASE_SELECT_ATLEAST_ONE_COURSE)
    } else if (activePathStep === 0) {
      dispatch(Actions.learningPathActions.getFirstNextClicked(true));
    } else if (activePathStep === 1) {
      setActivePathStep(activePathStep + 1);
    } else if (activePathStep === steps?.length - 1) {
      const path = {
        "employeeIds": userIdArr,
        "learningPathIds":learningPathDuration
      }
      dispatch(Actions.learningPathActions.createAssignLearningPath(path));
      setTimeout(() => {
        setActivePathStep(activePathStep + 1);
      }, 1000);
    }
    dispatch(Actions.learningPathActions.getActivePathStep(activePathStep));
  };

  const handleBack = () => {
    setActivePathStep(activePathStep - 1);
  };

  const renderFinalPage = status && status === 202
    ? userIdArr?.length > 0
      ? <>
        <CheckCircleIcon className={classes.checkIcon} />
        <Typography variant="h5" align="center" className={classes.assignedLabel}>
          {LEARNING_PATH_LABELS.LEARNING_PATH_CREATED_AND_ASSIGNED}
        </Typography>
        <Typography variant="subtitle1" align="center">
          {LEARNING_PATH_LABELS.EMAIL_SENT_TO_EMPLOYEE}
        </Typography>
        <Button
          variant="contained"
          type="button"
          onClick={closeHandler}
          className={classes.closeButton}>
          {BUTTONS.CLOSE}
        </Button>
      </>
      : <>
      <SucessPage/>
      </>
    : status && status === 404 ? 
      <>
        <ErrorIcon className={classes.errorIcon} />
        <Typography variant="h5" align="center" className={classes.errorLabel}>
          {LEARNING_PATH_LABELS.SOMETHING_WENT_WRONG}
        </Typography>
        <Typography variant="subtitle1" align="center">
          {LEARNING_PATH_LABELS.CLICK_OVER_CLOSE_BUTTON}
        </Typography>
      </> : 
      <CircularProgress className={classes.loader} />;
  const showSteps=()=>{
    if(activePathStep!==0){
      return (
        <Grid container className={classes.stepperContainer} style={{backgroundColor:"white",display:'flex',justifyContent:"center"}}>
          <Toolbar className={classes.clrosButton} style={{position:'absolute',right:"0px"}}>
            <IconButton edge="end" color="inherit" onClick={closeHandler} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
          <Stepper activeStep={activePathStep} connector={<QontoConnector />}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel
                  StepIconProps={{
                    classes: {
                      active: classes.active,
                      completed: classes.completed
                    }
                  }}
                >{label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Grid>
      );
    }
  }
  return (
    <React.Fragment>
      <TopNav />
      <main className="main-content">
        <div className={classes.toolbar} />
        <div className="container">
          <Box component='div' className={classes.layout}>
            {showSteps()}
            <React.Fragment>
              {activePathStep === steps?.length ? (
                <React.Fragment>
                  <Container component="main" maxWidth="xs" className={classes.successContainer}>
                    {renderFinalPage}
                  </Container>
                </React.Fragment>
              ) : (
                  <React.Fragment>
                    {getStepContent(activePathStep)}
                    <Box component='div' className={classes.buttons}>
                      {activePathStep !== 0 && (
                        <Button onClick={handleBack} className={classes.button}>
                          {BUTTONS.BACK}
                        </Button>
                      )}
                      <Button
                        variant="contained"
                        type="button"
                        onClick={handleNext}
                        className={classes.button}>
                        {activePathStep === steps?.length - 1
                          ? userIdArr?.length > 0
                            ? BUTTONS.ASSIGN
                            : BUTTONS.SUBMIT
                          : BUTTONS.NEXT}
                      </Button>
                    </Box>
                  </React.Fragment>
                )}
            </React.Fragment>
          </Box>
        </div>
      </main>
    </React.Fragment>
  );
}

AssignedCreateLearningPath.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default WithLoading(AssignedCreateLearningPath);