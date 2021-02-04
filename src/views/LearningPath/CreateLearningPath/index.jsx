import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import Container from "@material-ui/core/Container";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import CardMedia from "@material-ui/core/CardMedia";
import Box from "@material-ui/core/Box";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import SelectCourses from "../SelectCourses";
import SelectCourses1 from "../details";
import SelectUsers from "../SelectUsers";
import SetDuration from "../SetDuration";
import AddLearningPath from "../../../images/AddLearningPath.svg";
import { useStyles, QontoConnector } from "./style";
import Actions from "../../../store/actions";
import {
  STEPS,
  MESSAGES,
  LEARNING_PATH_LABELS,
  BUTTONS,
} from "../../../modules/constants";
import WithLoading from "../../../hoc/WithLoading";
import { error } from "../../../utils/notifications";
import TopNav from "../../../components/TopNav";

const steps = STEPS;
const getStepContent = (step) => {
  switch (step) {
    case 0:
      return <SelectCourses1 />;
    case 1:
      return <SelectCourses />;
    case 2:
      return <SelectUsers />;
    case 3:
      return <SetDuration />;
    default:
      throw new Error(MESSAGES.UNKNOWN_STEP);
  }
};

const CreateLearningPath = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const learningPathState = useSelector((state) => state.learningPathState);
  const loginState = useSelector((res) => res.loginState);
  const { handleClose, handleClosePath } = props;
  const [activePathStep, setActivePathStep] = useState(0);
  const {
    learningPathName,
    courseIdArr,
    userIdArr,
    learningPathDuration,
    status,
    learningPathDes,
    learningPathLevel,
  } = learningPathState;
  const { user } = loginState;

  const handleNext = () => {
    if (
      activePathStep === 0 &&
      learningPathName !== "" &&
      courseIdArr?.length > 0
    ) {
      setActivePathStep(activePathStep + 1);
    } else if (
      activePathStep === 0 &&
      learningPathName !== "" &&
      courseIdArr?.length === 0
    ) {
      setActivePathStep(activePathStep + 1);
      // error(MESSAGES.PLEASE_SELECT_ATLEAST_ONE_COURSE);
    } else if (activePathStep === 0) {
      dispatch(Actions.learningPathActions.getFirstNextClicked(true));
    } else if (activePathStep === 1) {
      setActivePathStep(activePathStep + 1);
    } else if (activePathStep === 2) {
      setActivePathStep(activePathStep + 1);
    } else if (activePathStep === steps?.length - 1) {
      const path = {
        name: learningPathName,
        madeById: user.id,
        madeForId: userIdArr,
        coursesId: courseIdArr,
        duration: learningPathDuration,
        description: learningPathDes,
        competencyLevelId: learningPathLevel,
      };
      dispatch(Actions.learningPathActions.createLearningPath(path));
      setTimeout(() => {
        setActivePathStep(activePathStep + 1);
      }, 1000);
    }
    dispatch(Actions.learningPathActions.getActivePathStep(activePathStep));
  };

  const handleBack = () => {
    setActivePathStep(activePathStep - 1);
  };

  console.log((activePathStep == 0 && learningPathName == '') || (activePathStep == 0 && learningPathDes == '') || (courseIdArr?.length == 0 && activePathStep > 0) || (userIdArr?.length == 0 && activePathStep > 0))
  const renderFinalPage =
    status && status === "success" ? (
      userIdArr?.length > 0 ? (
        <>
          <CheckCircleIcon className={classes.checkIcon} />
          <Typography
            variant="h5"
            align="center"
            className={classes.assignedLabel}
          >
            {LEARNING_PATH_LABELS.LEARNING_PATH_CREATED_AND_ASSIGNED}
          </Typography>
          <Typography variant="subtitle1" align="center">
            {LEARNING_PATH_LABELS.EMAIL_SENT_TO_EMPLOYEE}
          </Typography>
        </>
      ) : (
          <>
            <CheckCircleIcon className={classes.checkIcon} />
            <Typography
              variant="h5"
              align="center"
              className={classes.assignedLabel}
            >
              {LEARNING_PATH_LABELS.LEARNING_PATH_CREATED}
            </Typography>
          </>
        )
    ) : (status && status === "failure" ? (
      <>
        <ErrorIcon className={classes.errorIcon} />
        <Typography variant="h5" align="center" className={classes.errorLabel}>
          {LEARNING_PATH_LABELS.SOMETHING_WENT_WRONG}
        </Typography>
        <Typography variant="subtitle1" align="center">
          {LEARNING_PATH_LABELS.CLICK_OVER_CLOSE_BUTTON}
        </Typography>
      </>
    ) : ""
      );

  return (
    <React.Fragment>
      <TopNav />
      <main className="main-content">
        <div className={classes.toolbar} />
        <div className="container">
          <Box component="div" className={classes.layout}>
            <Grid container className={classes.stepperContainer}>
              <Grid item xs={3}></Grid>
              <Grid item xs={6}>
                <Box
                  component="div"
                  className={classes.learningImg}
                  justifyContent="center"
                >
                  <CardMedia
                    className={classes.media}
                    image={AddLearningPath}
                    title={LEARNING_PATH_LABELS.CREATE_LEARNING_PATH}
                  />
                  <Typography component="h3" variant="h6" align="center">
                    {learningPathName && activePathStep !== 0
                      ? learningPathName
                      : LEARNING_PATH_LABELS.CREATE_LEARNING_PATH}
                  </Typography>
                </Box>
                <Typography variant="subtitle2" align="center" style={{ color: "#858585", margin: "0 0 0 152px" }}>
                  {LEARNING_PATH_LABELS.LEARNING_PATH_DETAILS}
                </Typography>
                <Stepper
                  style={{ padding: "24px 0" }}
                  activeStep={activePathStep}
                  connector={<QontoConnector />}
                >
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel
                        StepIconProps={{
                          classes: {
                            active: classes.active,
                            completed: classes.completed,
                          },
                        }}
                      >
                        {label}
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Grid>
              <Grid item xs={3}>
                <Toolbar className={classes.clrosButton}>
                  <IconButton
                    edge="end"
                    color="inherit"
                    onClick={handleClose}
                    aria-label="close"
                  >
                    <CloseIcon />
                  </IconButton>
                </Toolbar>
              </Grid>
            </Grid>
            <React.Fragment>
              {activePathStep === steps?.length ? (
                <React.Fragment>
                  <Container
                    component="main"
                    maxWidth="xs"
                    className={classes.successContainer}
                  >
                    {renderFinalPage}

                    <Button
                      variant="contained"
                      type="button"
                      onClick={handleClosePath}
                      className={classes.closeButton}
                    >
                      {BUTTONS.CLOSE}
                    </Button>


                  </Container>
                </React.Fragment>
              ) : (
                  <React.Fragment>
                    {getStepContent(activePathStep)}
                    <Box component="div" className={classes.buttons}>
                      {activePathStep !== 0 && (
                        <Button onClick={handleBack} className={classes.button}>
                          {BUTTONS.BACK}
                        </Button>
                      )}
                      {activePathStep === 2 && <Button
                        variant="contained"
                        disabled={userIdArr?.length != 0}
                        type="button"
                        onClick={handleNext}
                        className={classes.button}
                      >
                        {BUTTONS.SKIP}
                      </Button>}
                      <Button
                        disabled={((activePathStep == 0 && learningPathName == '') || (activePathStep == 0 && learningPathDes == '') || (courseIdArr?.length == 0 && activePathStep > 0) || (userIdArr?.length == 0 && activePathStep == 2))}
                        variant="contained"
                        type="button"
                        onClick={handleNext}
                        className={classes.button}
                      >
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
};

CreateLearningPath.propTypes = {
  handleClose: PropTypes.func.isRequired,
  handleClosePath: PropTypes.func.isRequired,
};

export default WithLoading(CreateLearningPath);
