import React from 'react';
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
import CloseIcon from '@material-ui/icons/Close';
import SelectCourses from '../SelectCourses';
import SelectUsers from '../SelectUsers';
import SetDuration from '../SetDuration';
import CardMedia from '@material-ui/core/CardMedia';
import Box from '@material-ui/core/Box';
import AddLearningPath from '../../../images/AddLearningPath.svg';
import { useStyles, QontoConnector } from './style';
import Actions from '../../../store/actions';

const steps = ['Courses', 'Assign Users', 'Set Duration'];
const getStepContent = (step) => {
    switch (step) {
        case 0:
            return <SelectCourses/>;
        case 1:
            return <SelectUsers />;
        case 2:
            return <SetDuration />;
        default:
            throw new Error('Unknown step');
    }
}

const CreateLearningPath = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const learningPathState = useSelector(state => state.learningPathState);
    const loginState = useSelector(res => res.loginState);
    const { handleClose, handleClosePath } = props;
    const [activePathStep, setActivePathStep] = React.useState(0);
    const { learningPathName, courseIdArr, userIdArr, learningPathDuration } = learningPathState;
    const { user } = loginState;

    const handleNext = () => {
        if(activePathStep === 0 && learningPathName !== "" && courseIdArr?.length > 0) {
            setActivePathStep(activePathStep + 1);
        } else if(activePathStep === 1 && userIdArr?.length > 0) {
            setActivePathStep(activePathStep + 1);
        } else if(activePathStep === steps?.length - 1) {
            const path = {
                name: learningPathName,
                madeById: user.id,
                madeForId: userIdArr,
                coursesId: courseIdArr,
                duration: learningPathDuration,
            }
            dispatch(Actions.learningPathActions.createLearningPath(path));
            setActivePathStep(activePathStep + 1);
        }
    };

    // const handleBack = () => {
    //     setActivePathStep(activePathStep - 1);
    // };
    return (
        <React.Fragment>
            <Box component='div' className={classes.layout}>
                <Grid container className={classes.stepperContainer}>
                    <Grid item xs={3}>
                    </Grid>
                    <Grid item xs={6}>
                        <Box component='div' className={classes.learningImg} justifyContent="center">
                            <CardMedia
                                className={classes.media}
                                image={AddLearningPath}
                                title="Contemplative Reptile"
                            />
                            <Typography component="h1" variant="h5" align="center">
                                Create Learning Path
                            </Typography>
                        </Box>
                        <Typography variant="subtitle2" align="center">
                            Please provide details below to add learning path
                        </Typography>
                        <Stepper activeStep={activePathStep} connector={<QontoConnector />}>
                            {steps.map((label) => (
                                <Step key={label} className={classes.step}>
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
                    <Grid item xs={3}>
                        <Toolbar className={classes.clrosButton}>
                            <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
                                <CloseIcon />
                            </IconButton>
                        </Toolbar>
                    </Grid>
                </Grid>
                <React.Fragment>
                    {activePathStep === steps?.length ? (
                        <React.Fragment>
                            <Container component="main" maxWidth="xs" className={classes.successContainer}>
                                <Typography variant="h5" align="center" className={classes.assignedLabel}>
                                    Successfully Assigned.
                                </Typography>
                                <Typography variant="subtitle1" align="center">
                                    An email has been sent to the employees
                                </Typography>
                                <Box component='div' className={classes.buttons}>
                                    <Button
                                        variant="contained"
                                        type="button"
                                        onClick={handleClosePath}
                                        className={classes.closeButton}
                                    >
                                        Close
                                    </Button>
                                </Box>
                            </Container>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {getStepContent(activePathStep)}
                            <Box component='div' className={classes.buttons}>
                                {/* {activePathStep !== 0 && (
                                <Button onClick={handleBack} className={classes.button}>
                                Back
                                </Button>
                                )} */}
                                <Button
                                    variant="contained"
                                    type="button"
                                    onClick={handleNext}
                                    className={classes.button}
                                >
                                    {activePathStep === steps?.length - 1 ? 'Assign' : 'Next'}
                                </Button>
                            </Box>
                        </React.Fragment>
                        )}
                </React.Fragment>
            </Box>
        </React.Fragment>
    );
}

export default CreateLearningPath;