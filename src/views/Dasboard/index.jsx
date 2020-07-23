import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';
import { useHistory } from "react-router-dom";
import { cloneDeep } from 'lodash';
import Avatar from '@material-ui/core/Avatar';

import CardMedia from '@material-ui/core/CardMedia';

import XebiaLogo from '../../images/Logo.svg'
import AddLearningPath from '../../images/AddLearningPath.svg'
import DashboardSelectedIcon from '../../components/CustomIcons/DashboardSelectedIcon';
import LearingPathIcon from '../../components/CustomIcons/LearingPathIcon';
import ApprovalsIcon from '../../components/CustomIcons/ApprovalsIcon';
import LearningPath from '../LearningPath/index';

import { validateUserEmail, verifyOtp } from '../../modules/authServices';

import { useStyles } from './style';




export default function Dashboard() {
  const classes = useStyles();
  const history = useHistory();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const closeHandler = () => {
    setOpen(false);
  };

  return (
    <div>
      <Grid
        justify="space-between" // Add it here :)
        container
        spacing={24}
      >
        <CardMedia
          className={classes.logo}
          image={XebiaLogo}
          title="Contemplative Reptile"
        />
        <Grid
          item xs={8}
          className={classes.dashboardBtns}
        >
          <Button
            variant="contained"
            className={classes.button, classes.dashboardBtn}
            startIcon={<DashboardSelectedIcon />}
          >
            Dashboard
          </Button>
          <Button
            variant="contained"
            color="default"
            className={classes.button}
            startIcon={<LearingPathIcon />}
          >
            Learning Path
          </Button>
          <Button
            variant="contained"
            color="default"
            className={classes.button, classes.approvalBtn}
            startIcon={<ApprovalsIcon />}
          >
            Approvals
          </Button>
        </Grid>
        {/* <Grid
         item xs={8}
         
        >
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </Grid>  */}
      </Grid>

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <CardMedia
            className={classes.media}
            image={AddLearningPath}
            title="Contemplative Reptile"
          />
          <Typography component="h1" variant="h5">
            Welcome, Madhur Arya
        </Typography>
          <Typography component="h1" variant="subtitle2">
            Please assign first learning path to your team
        </Typography>



          <Button
            type="button"
            fullWidth
            variant="contained"
            className={classes.submit}
            onClick={handleClickOpen}
          >
            Create Learning Path
          </Button>

        </div>

      </Container>
      <LearningPath
        open={open}
        handleClose={closeHandler}
      />
    </div>

  );
}