import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import Button from "@material-ui/core/Button";
import Actions from "../../../src/store/actions";

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";

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
    marginBottom: theme.spacing(1),
    boxShadow: "none",
  },
  title: {
    display: 'block',
    fontSize: "12px",
    borderLeft: "1px solid #d3d3d3",
    padding: "0px 0 0 20px"
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      marginLeft: '38px'
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
  navSubmit: {
    background: "linear-gradient(180deg, #FFAB39 0%, #F07200 100%)",
    color: "#FFFFFF",
    textTransform: "capitalize",
    padding: "10px 33px",
    fontSize: 12,
  },
}));

const TopNav = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  let { title } = props;
  const userRole = JSON.parse(sessionStorage.getItem("USER_INFO")).roles[0].roleName;

  const handleClickOpen = () => {
    dispatch(Actions.learningPathActions.pathModelOpen(true));
    dispatch(Actions.learningPathActions.clearCreateLpFormFields());
  };

  const modalBtn = (
    <Button
      type="button"
      fullWidth
      variant="contained"
      className={classes.navSubmit}
      onClick={handleClickOpen}
      startIcon={<AddCircleOutlineOutlinedIcon style={{ fontSize: 20 }} />}>
      Create Learning Path
    </Button>
  );

  return (
    <AppBar position="fixed" className={classes.appBar} color="transparent">
      <Toolbar>
        <CardMedia
          className={classes.imgXebia}
          image={XebiaLogo}
          title={title}
        />
        <Typography className={classes.title} variant="h6" noWrap >
          Learning Management System
        </Typography>
        <div className={classes.grow} />
        <div>
          {userRole === "ROLE_MANAGER" ? modalBtn : ""}
        </div>
        <div className={classes.sectionDesktop}>
          {props.children}
          <NotificationTray></NotificationTray>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default TopNav;
