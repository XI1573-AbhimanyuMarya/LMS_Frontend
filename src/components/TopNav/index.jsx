import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';

import NotificationTray from "./NotificationTray";
import XebiaLogo from "../../images/Logo.svg";
import { DRAWER_WIDTH } from '../../modules/constants';


const drawerWidth = DRAWER_WIDTH;

export const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  appBar: {
    width: `calc(100% - ${drawerWidth})`,
    marginLeft: drawerWidth,
    backgroundColor: "#ffffff",
    marginBottom: theme.spacing(1)
  },
  title: {
    display: 'block',
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  imgXebia: {
    width: 90,
    height: 25,
    marginRight: theme.spacing(2),
  },
  notification: {
    width: 35,
    height: 24,
    color: "#999999"
  },
  navIcons: {
    width: 25,
    height: 25,
    objectFit: "contain",
  },
  MuiListItemIcon: {
    minWidth: 28
  },
  userIcon: {
    marginTop: theme.spacing(2),
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  name: {
    marginTop: theme.spacing(2)
  },
}));

const TopNav = (props) => {
  const classes = useStyles();
  let { title } = props;
  return (
    <AppBar position="fixed" className={classes.appBar} color="transparent">
      <Toolbar>
        <CardMedia
          className={classes.imgXebia}
          image={XebiaLogo}
          title={title}
        />
        <Typography className={classes.title} variant="h6" noWrap >
          {title}
        </Typography>
        <div className={classes.grow} />
        <div className={classes.sectionDesktop}>
          {props.children}
          <NotificationTray></NotificationTray>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default TopNav;
