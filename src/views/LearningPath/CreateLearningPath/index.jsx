import React from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import StepConnector from '@material-ui/core/StepConnector';
import { withStyles } from '@material-ui/core/styles';
import SelectCourses from '../SelectCourses';
import SelectUsers from '../SelectUsers';
import SetDuration from '../SetDuration';
import CardMedia from '@material-ui/core/CardMedia';
import AddLearningPath from '../../../images/AddLearningPath.svg';
import { useStyles } from './style';

const QontoConnector = withStyles({
    alternativeLabel: {
        top: 10,
        left: 'calc(-50% + 16px)',
        right: 'calc(50% + 16px)',
    },
    active: {
        '& $line': {
            borderColor: '#621D58',
        },
    },
    completed: {
        '& $line': {
            borderColor: '#621D58',
        },
    },
    line: {
        borderColor: '#eaeaf0',
        borderTopWidth: 3,
        borderRadius: 1,
    },
})(StepConnector);

const getCoursesList = () => {
    const courses = [
        { id: 1, title: 'Machine Learning', Description: 'Learn how to design great user experiences. Design that delights users...' },
        { id: 2, title: 'Interaction Design Specialization', Description: 'Learn how to design great user experiences. Design that delights users...' },
        { id: 3, title: 'Python 3 Programming Specialization', Description: 'Learn how to design great user experiences. Design that delights users...' },
        { id: 4, title: 'Machine Learning', Description: 'Learn how to design great user experiences. Design that delights users...' },
        { id: 5, title: 'Machine Learning', Description: 'Learn how to design great user experiences. Design that delights users...' },
        { id: 6, title: 'Machine Learning', Description: 'Learn how to design great user experiences. Design that delights users...' },
        { id: 7, title: 'Machine Learning', Description: 'Learn how to design great user experiences. Design that delights users...' },
        { id: 8, title: 'Machine Learning', Description: 'Learn how to design great user experiences. Design that delights users...' },
    ];
    return courses;
}

const steps = ['Courses', 'Assign Users', 'Set Duration'];

const getStepContent = (step) => {
    switch (step) {
        case 0:
            return <SelectCourses coursesList={getCoursesList} />;
        case 1:
            return <SelectUsers />;
        case 2:
            return <SetDuration />;
        default:
            throw new Error('Unknown step');
    }
}

const CreateLearningPath = (props) => {
    const { handleClose, handleClosePath } = props;
    const classes = useStyles();
    const [activePathStep, setActivePathStep] = React.useState(0);

    const handleNext = () => {
        setActivePathStep(activePathStep + 1);
    };

    const handleBack = () => {
        setActivePathStep(activePathStep - 1);
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <main className={classes.layout}>
                <Grid container item xs={12} justify="center" className={classes.breadcrumbs}>
                    <Container component="main" maxWidth="sm" className={classes.mainContainer}>
                        <div className={classes.learningImg}>
                            <CardMedia
                                className={classes.media}
                                image={AddLearningPath}
                                title="Contemplative Reptile"
                            />
                            <Typography component="h1" variant="h5" align="center">
                            
                                Create Learning Path
                            </Typography>
                        </div>
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
                    </Container>
                    <Toolbar>
                        <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </Grid>
                <React.Fragment>
                    {activePathStep === steps.length ? (
                        <React.Fragment>
                            <Container component="main" maxWidth="xs" className={classes.successContainer}>
                                <CssBaseline />
                                <Typography variant="h5" align="center" className={classes.assignedLabel}>
                                    Successfully Assigned.
                                </Typography>
                                <Typography variant="subtitle1" align="center">
                                    An email has been sent to the employees
                                </Typography>
                                <div className={classes.buttons}>
                                    <Button
                                        variant="contained"
                                        type="button"
                                        onClick={handleClosePath}
                                        className={classes.closeButton}
                                    >
                                        Close
                                    </Button>
                                </div>
                            </Container>
                        </React.Fragment>
                    ) : (
                            <React.Fragment>
                                {getStepContent(activePathStep)}
                                <div className={classes.buttons}>
                                    {activePathStep !== 0 && (
                                    <Button onClick={handleBack} className={classes.button}>
                                    Back
                                    </Button>
                                )}
                                    <Button
                                        variant="contained"
                                        type="button"
                                        onClick={handleNext}
                                        className={classes.button}
                                    >
                                        {activePathStep === steps.length - 1 ? 'Assign' : 'Next'}
                                    </Button>
                                </div>
                            </React.Fragment>
                        )}
                </React.Fragment>
            </main>
        </React.Fragment>
    );
}

export default CreateLearningPath;