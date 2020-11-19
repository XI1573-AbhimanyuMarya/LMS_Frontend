import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CardMedia from "@material-ui/core/CardMedia";
import NotificationsOutlinedIcon from "@material-ui/icons/NotificationsOutlined";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';

import XebiaLogo from "../../images/Logo.svg";
import DashboardIcon from '../../images/dashboard.svg';
import LearningPath from '../../images/LearningPath.svg';
import AddLearningPath from '../../images/AddLearningPath.svg';
import Approvals from '../../images/Approvals.svg';
import { useStyles } from "./style";

import userIcon from '../../images/Profile.jpg'

const Navbar = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const loginState = useSelector((res) => res.loginState);
  const {user} = loginState
  let title = 'dashboard'
  let notification = 1
  let notifLabel = `show ${notification} new notifications"`
  let extracontent;
  const navLinks = [
    {
      name: "Dashboard",
      iconPath: DashboardIcon
    },
    {
      name: "My Learning Path",
      iconPath: LearningPath
    },
    {
      name: "Assign Learning Path",
      iconPath: AddLearningPath
    },
    {
      name: "Approvals",
      iconPath: Approvals
    },
    {
      name: "Manage assigned learning",
      iconPath: DashboardIcon
    },
  ]
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar} color="transparent">
        <Toolbar>
          <CardMedia
            className={classes.imgXebia}
            image={XebiaLogo}
            title="Dashboard"
          />
          <Typography className={classes.title} variant="h6" noWrap >
            {title}
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {extracontent ? extracontent : ''}
            <IconButton aria-label={notifLabel} color="inherit">
              <Badge
                badgeContent={notification}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                color="secondary">
                <NotificationsOutlinedIcon className={classes.notification} />
              </Badge>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
          <Avatar alt="user" src={userIcon} className={classes.userIcon} />
          <Typography variant="subtitle2" className={classes.name}>
            {user.fullName}
          </Typography>
          <Typography variant="subtitle2" className={classes.designation}>
            {user.designation}
          </Typography>
        </div>

        <List className={classes.navLinks}>
          {navLinks.map(item => (
            <ListItem button key={item.name}>
              <ListItemIcon className={classes.MuiListItemIcon}>
                <Icon >
                  <img src={item.iconPath} className={classes.navIcons} />
                </Icon>
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
          ))}

        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Paper style={{ minHeight: "88vh" }} elevation={3}>
          {props.children}
        </Paper>
      </main>
    </div>
  );
}

export default Navbar;