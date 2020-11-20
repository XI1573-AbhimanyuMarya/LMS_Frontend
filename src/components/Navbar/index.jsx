import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

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
import Box from '@material-ui/core/Box';

import XebiaLogo from "../../images/Logo.svg";
import DashboardIcon from '../../images/dashboard.svg';
import DashboardActive from '../../images/dashboardActive.svg';
import LearningPath from '../../images/learningpath.svg'
import LearningPathActive from '../../images/learningpathActive.svg';
import Logout from '../../images/Logout.svg';
import AddLearningPath from '../../images/AddLearningPath.svg';
import Approvals from '../../images/Approvals.svg';
import { useStyles } from "./style";
import Actions from "../../store/actions";
import userIcon from '../../images/Profile.jpg'
import Copyright from '../Copyright'

const Navbar = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  let location = useLocation();
  const [path, setPath] = useState('/')
  const loginState = useSelector((res) => res.loginState);
  const { user } = loginState;
  let title = 'dashboard';
  let notification = 1;
  let notifLabel = `show ${notification} new notifications"`;
  let extracontent, currentPath;
  currentPath = path

  const navLinks = [
    {
      name: "Dashboard",
      iconPath: currentPath === "/dashboard" ? DashboardActive : DashboardIcon,
      to: "dashboard",
      isActive: currentPath === "/dashboard",
      canAccess: true
    },
    {
      name: "My Learning Path",
      iconPath: currentPath === "/learningpath" ? LearningPathActive : LearningPath,
      to: "learningpath",
      isActive: currentPath === "/learningpath",
      canAccess: true
    },
    {
      name: "Assign Learning Path",
      iconPath: AddLearningPath,
      to: "/assigned",
      isActive: currentPath === "/assigned",
      canAccess: user.designation !== "Consultant"
    },
    {
      name: "Approvals",
      iconPath: Approvals,
      to: "approvals",
      isActive: currentPath === "/approvals",
      canAccess: user.designation !== "Consultant"
    },
    {
      name: "Manage assigned learning",
      iconPath: DashboardIcon,
      to: "manage",
      isActive: currentPath === "/manage",
      // canAccess: user.designation !== "Consultant"
      canAccess: true
    },
  ];

  useEffect(() => {
    setPath(location.pathname)

  }, [path])
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

        <List className={classes.navList}>
          {navLinks.map(item => (
            <div className={[classes.navLinks, item.isActive ? classes.active : '', item.canAccess ? '' : classes.disableLink].join(' ')}>
              <Link to={item.to} key={item.name} >
                < ListItem button >
                  <ListItemIcon className={classes.MuiListItemIcon}>
                    <Icon >
                      <img src={item.iconPath} className={classes.navIcons} />
                    </Icon>
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItem>
              </Link>
            </div>
          ))}
        </List>
        <div className={classes.grow} />
        < ListItem button onClick={() => dispatch(Actions.loginActions.logout())} className={classes.navLinks}>
          <ListItemIcon className={classes.MuiListItemIcon}>
            <Icon >
              <img src={Logout} className={classes.navIcons} />
            </Icon>
          </ListItemIcon>
          <ListItemText primary="logout" />
        </ListItem>

      </Drawer >
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Paper style={{ minHeight: "86vh" }} elevation={3} className={classes.main}>
          {props.children}
          <Box pt={4}>
            <Copyright />
          </Box>
        </Paper>
      </main>
    </div >
  );
}

export default Navbar;