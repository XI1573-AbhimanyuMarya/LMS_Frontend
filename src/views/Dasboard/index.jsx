import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import XebiaLogo from '../../images/Logo.svg'
import AddLearningPath from '../../images/AddLearningPath.svg'
import DashboardSelectedIcon from '../../images/CustomIcons/DashboardSelectedIcon';
import LearingPathIcon from '../../images/CustomIcons/LearingPathIcon';
import ApprovalsIcon from '../../images/CustomIcons/ApprovalsIcon';
import LearningPath from '../LearningPath/index';

import { useStyles } from './style';

export default function Dashboard() {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const closeHandler = () => {
    setOpen(false);
  };

  return (
    <>
      <Grid className={classes.gridRoot} container >
        <Grid item xs={3}>
          <CardMedia
            className={classes.logo}
            image={XebiaLogo}
            title="Contemplative Reptile"
          />
        </Grid>
        <Grid container xs={6} justify="center" className={classes.dashboardBtns}>
          <Button
            variant="contained"
            className={classes.dashboardBtn}
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
            className={classes.approvalBtn}
            startIcon={<ApprovalsIcon />}
          >
            Approvals
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Avatar alt="Remy Sharp" src={XebiaLogo} />
        </Grid>
      </Grid>

      <Container component="main" maxWidth="xs"className = {classes.mainContainer}> 
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
    </>

  );
}