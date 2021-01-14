import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useStyles } from "./style";
import IconButton from '@material-ui/core/IconButton';
import NotificationsOutlinedIcon from "@material-ui/icons/NotificationsOutlined";
import Badge from '@material-ui/core/Badge';
import Drawer from '@material-ui/core/Drawer';


import NotificationBox from "./NotificationBox";
import Actions from "../../store/actions";

const NotificationTray = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const notificationPathState = useSelector(state => state.notificationState);
  const loginState = useSelector((res) => res.loginState);
  const { notificationList, count } = notificationPathState;


  function getCount(){
    dispatch(Actions.notificationActions.fetchNotificationCount(loginState.user.id));
  };

  useEffect(() => {
      getCount()
      const interval = setInterval(() => getCount(), 10000)
      return () => {
        clearInterval(interval);
      }
  }, [])

  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    if(anchor){
      dispatch(Actions.notificationActions.fetchNotifications(loginState.user.id));
      dispatch(Actions.notificationActions.eraseCount())
    }
    setState({ ...state, [anchor]: open });
  };

  const anchor = "right";
  let notifLabel = `show ${count} new notifications"`;
  return (
      <React.Fragment key={anchor}>
        <IconButton aria-label={notifLabel} color="inherit" onClick={toggleDrawer(anchor, true)}>
          <Badge
            badgeContent={count}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            color="secondary">
            <NotificationsOutlinedIcon />
          </Badge>
        </IconButton>
        <Drawer 
          anchor={anchor} 
          open={state[anchor]} 
          onClose={toggleDrawer(anchor, false)}
          BackdropProps={{ invisible: true }}
        >
          <div className={classes.notification_tray}>
            <div className={classes.notification_tray_header}>Notification</div>
            {notificationList.map((notification, index) => (
              <div className={classes.notification_box} key={index}>
                <NotificationBox notificationInfo={notification}></NotificationBox>
              </div>
            ))}
          </div>
        </Drawer>
      </React.Fragment>
  );
};

export default NotificationTray;
