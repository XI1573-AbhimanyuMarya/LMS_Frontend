import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import CardMedia from "@material-ui/core/CardMedia";
import NotificationsOutlinedIcon from "@material-ui/icons/NotificationsOutlined";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
import Avatar from "@material-ui/core/Avatar";
import DashboardIcon from "../../images/dashboard.svg";
import DashboardActive from "../../images/dashboardActive.svg";
import LearningPath from "../../images/LearningPath.svg";
import LearningPathActive from "../../images/learningpathActive.svg";
import Logout from "../../images/Logout.svg";
import AddLearningPath from "../../images/AddLearningPath.svg";
import AddLearningPathA from "../../images/AddLearningPathA.svg";
import Approvals from "../../images/Approvals.svg";
import ApprovalsA from "../../images/ApprovalsA.svg";
import { useStyles } from "./style";
import Actions from "../../store/actions";
import userIcon from "../../images/Profile.jpg";
import Copyright from "../Copyright";
import TopNav from "../TopNav";

const Navbar = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  let location = useLocation();
  const [path, setPath] = useState("/");
  const loginState = useSelector((res) => res.loginState);
  const { user, roles } = loginState;
  let extracontent, currentPath;
  currentPath = path;

  const navLinks = [
    // {
    //   name: "Dashboard",
    //   iconPath: currentPath === "/dashboard" ? DashboardActive : DashboardIcon,
    //   to: user.designation === "HR" || user.designation === "Admin" ? "dashboard" : "dashboard-admin",
    //   isActive: currentPath === "/dashboard",
    //   canAccess: true
    // },
    {
      name: "Dashboard",
      iconPath: currentPath === "/dashboard" ? DashboardActive : DashboardIcon,
      to: "dashboard",
      isActive: currentPath === "/dashboard",
      canAccess: true
    },
    {
      name: "My Learning Path",
      iconPath:
        currentPath === "/learningpath" ? LearningPathActive : LearningPath,
      to: "learningpath",
      isActive: currentPath === "/learningpath",
      canAccess: user.designation !== "Admin" || user.designation !== "Hr",
    },
    {
      name: "Assign Learning Path",
      iconPath: currentPath === "/assigned" ? AddLearningPathA : AddLearningPath,
      to: "assigned",
      isActive: currentPath === "/assigned",
      canAccess: roles[0].roleName === "ROLE_MANAGER",
    },
    {
      name: "Approvals",
      iconPath: currentPath === "/approvals" ? ApprovalsA : Approvals,
      to: "approvals",
      isActive: currentPath === "/approvals",
      canAccess: roles[0].roleName === "ROLE_MANAGER",
    },
    {
      name: "Manage assigned learning",
      iconPath: currentPath === "/manage" ? DashboardActive : DashboardIcon,
      to: "manage",
      isActive: currentPath === "/manage",
      canAccess: roles[0].roleName === "ROLE_MANAGER",
    },
  ];
  useEffect(() => {
    setPath(location.pathname);
  }, [path]);
  return (
    <div className={classes.root}>
      <CssBaseline />

      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div
          className={classes.toolbar}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Avatar alt="user" src={userIcon} className={classes.userIcon} />
          <Typography variant="subtitle2" className={classes.name}>
            {user.fullName}
          </Typography>
          <Typography variant="subtitle2" className={classes.designation}>
            {user.designation}
          </Typography>
        </div>

        <List className={classes.navList}>
          {navLinks.map((item) => (
            <div
              key={item.to}
              className={[
                classes.navLinks,
                item.isActive ? classes.active : "",
                item.canAccess ? "" : classes.hideLink,
              ].join(" ")}
            >
              <Link to={item.to} key={item.name}>
                <ListItem button>
                  <ListItemIcon className={classes.MuiListItemIcon}>
                    <Icon style={{height:"30px"}}>
                      <img src={item.iconPath} className={classes.navIcons} />
                    </Icon>
                  </ListItemIcon>
                  <ListItemText
                    primary={item.name}
                    className={classes.linkItem}
                  />
                </ListItem>
              </Link>
            </div>
          ))}
        </List>
        <div className={classes.grow} />
        <ListItem
          button
          onClick={() => dispatch(Actions.loginActions.logout())}
          className={classes.navLinks}
        >
          <ListItemIcon className={classes.MuiListItemIcon}>
            <Icon>
              <img src={Logout} className={classes.navIcons} />
            </Icon>
          </ListItemIcon>
          <ListItemText primary="logout" />
        </ListItem>
      </Drawer>
      {props.children}
    </div>
  );
};

export default Navbar;
