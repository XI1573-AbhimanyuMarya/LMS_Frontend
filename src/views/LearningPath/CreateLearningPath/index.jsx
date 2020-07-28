import React from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';

import SelectCourses from '../SelectCourses';
import SelectUsers from '../SelectUsers';
import SetDuration from '../SetDuration';

import { useStyles } from './style';

const steps = ['Courses', 'Assign Users', 'Set Duration'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <SelectCourses />;
    case 1:
      return <SelectUsers />;
    case 2:
      return <SetDuration />;
    default:
      throw new Error('Unknown step');
  }
}

export default function CreateLearningPath() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Grid item xs={6} className={classes.breadcrumbs}>
          <Typography component="h1" variant="h5" align="center">
            Create Learning Path
            </Typography>
          <Typography variant="subtitle2" align="center">
            Please provide details below to add learning path
            </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label} className={classes.step}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Grid>
        
        <React.Fragment>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Container component="main" maxWidth="xs" className = {classes.mainContainer}> 
              <CssBaseline />
              <Typography variant="h5" gutterBottom>
                Successfully Assigned.
                </Typography>
              <Typography variant="subtitle1">
                An email has been sent to the employees
                </Typography>
              </Container>  
            </React.Fragment>
          ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Assign' : 'Next'}
                  </Button>
                </div>
              </React.Fragment>
            )}
        </React.Fragment>
      </main>
    </React.Fragment>
  );
}