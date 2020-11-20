import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import getOr from 'lodash/fp/getOr';
import ItemsCarousel from 'react-items-carousel';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CardMedia from '@material-ui/core/CardMedia';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import Box from '@material-ui/core/Box';
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';

import DiscardPopup from '../../components/DiscardPopup';
import AddLearningPath from '../../images/AddLearningPath.svg'
import LearningPath from '../LearningPath/index';
import { useStyles } from './style';
import WithLoading from '../../hoc/WithLoading';
import Actions from '../../store/actions';
import DashboardDetail from '../Chart'


const Dashboard = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const loginState = useSelector(res => res.loginState);
  const learningPathState = useSelector(state => state.learningPathState);
  const userName = getOr('User Name', 'user.fullName', loginState);
  const { assignedCources } = learningPathState;

  const showDashboard = !assignedCources.length

  useEffect(() => {
    dispatch(Actions.learningPathActions.getAssignedLearningPath(loginState.user.username))
  }, [])
  /**
   * function to open learning path model
   */
  const handleClickOpen = () => {
    dispatch(Actions.learningPathActions.pathModelOpen(true));
  };

  const closeHandler = () => {
    dispatch(Actions.learningPathActions.discardModelOpen(true));
  };

  const handleClosePathHandler = () => {
    dispatch(Actions.learningPathActions.pathModelOpen(false));
  }

  const discardHandler = (closeMainModel) => {
    dispatch(Actions.learningPathActions.discardModelOpen(false));
    if (closeMainModel) {
      dispatch(Actions.learningPathActions.pathModelOpen(false));
    }
  }
  const renderWelcome = (<Box component="div" m="auto">
    <Container component="main" maxWidth="xs" className={classes.mainContainer}>
      <CssBaseline />
      <div className={classes.paper}>
        <CardMedia
          className={classes.media}
          image={AddLearningPath}
          title="add learning path"
        />
        <Typography component="h1" variant="h5" gutterBottom>
          Welcome, {userName}
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
          startIcon={<AddCircleOutlineOutlinedIcon style={{ fontSize: 40 }} />}
        >
          Create Learning Path
            </Button>
      </div>
    </Container>
    <LearningPath
      handleClose={closeHandler}
      handleClosePath={handleClosePathHandler}
    />
    <DiscardPopup
      discardHandler={discardHandler}
    />
  </Box>)
  return (
    <>
      {
        showDashboard ?
          <DashboardDetail />
          :
          renderWelcome
      }
    </>
  );
}

export default WithLoading(Dashboard);