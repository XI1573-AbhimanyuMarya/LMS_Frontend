import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';

import AddLearningPath from '../../../images/LearningPath.svg'
import { Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    height: "100%",
    flexDirection: "column"
  },
  stop: {
    width: 109,
    height: 109,
    padding: "2px 15px 11px 22px",
    backgroundColor: "#fa6400",
  },
  icon: {
    width: theme.spacing(5),
    height: theme.spacing(5)
  },
  m: {
    margin: theme.spacing(1)
  }
}))

const NoAssignedlearningpath = (props) => {
  const classes = useStyles();
  const loginState = useSelector((res) => res.loginState);
  const { user } = loginState;

  return (
    <div className={classes.root}>
      <Icon className={classes.icon}  >
        <img src={AddLearningPath} className={classes.icon} />
      </Icon>
      <Typography variant="h6" className={classes.m}>
        {`Welcome, ${user.fullName}`}
      </Typography>
      <Typography variant="body2" className={classes.m} >
        There is no course assigned to you, request your manager for further learning.
      </Typography>

    </div>
  )
}

export default NoAssignedlearningpath;
