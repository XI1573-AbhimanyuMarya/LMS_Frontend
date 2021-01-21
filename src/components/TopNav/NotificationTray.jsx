import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useStyles } from "./style";
import IconButton from '@material-ui/core/IconButton';
import NotificationsOutlinedIcon from "@material-ui/icons/NotificationsOutlined";
import Badge from '@material-ui/core/Badge';
import Drawer from '@material-ui/core/Drawer';
import Pagination from "@material-ui/lab/Pagination";


import NotificationBox from "./NotificationBox";
import Actions from "../../store/actions";

const NotificationTray = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [page, setPage] = React.useState(1);

  const notificationPathState = useSelector(state => state.notificationState);
  const loginState = useSelector((res) => res.loginState);
 
  const { notificationList, count } = notificationPathState;
  let notifications = []

  notifications = notificationList.notifications || [];

  
  let pageCount = parseInt((notificationList.totalCount + 6 - 1) / 6) ;

  const [state, setState] = React.useState({
    right: false,
  });

  useEffect(() => {
    getCount()
    const interval = setInterval(() => getCount(), 10000)
    return () => {
      clearInterval(interval);
    }
  }, [])

  function markAsRead(){
    dispatch(Actions.notificationActions.markAsRead(loginState.user.id));
  }

  function getCount(){
    dispatch(Actions.notificationActions.fetchNotificationCount(loginState.user.id));
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    if(anchor){
      dispatch(Actions.notificationActions.fetchNotifications(loginState.user.id, 1));
      // dispatch(Actions.notificationActions.eraseCount())
    }
    setState({ ...state, [anchor]: open });
  };

  const anchor = "right";
  let notifLabel = `show ${count} new notifications"`;
  
  const handleChange = (event, value) => {
    dispatch(Actions.notificationActions.fetchNotifications(loginState.user.id, value));
    setPage(value);
  };
  const style = {
    margin: '0px 0px 20px 4px'
  };
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
            <div style={style}>
                <span className={classes.notification_tray_header}>Notification</span> 
                <span className={classes.mark_as_read} onClick={markAsRead} >mark as read</span>
            </div>
            {notifications.map((notification, index) => (
              <div className={classes.notification_box} key={index}>
                <NotificationBox notificationInfo={notification}></NotificationBox>
              </div>
            ))}
            {
              notifications.length>0 ?
              <Pagination
                className={classes.pagination_section}
                count={pageCount}
                page={page}
                siblingCount={1}
                boundaryCount={1}
                variant="outlined"
                shape="rounded"
                onChange={handleChange}
              />
              : <div className={classes.norecords}>Nothing Here !</div>
            }
          </div>
        </Drawer>
      </React.Fragment>
  );
};

export default NotificationTray;
