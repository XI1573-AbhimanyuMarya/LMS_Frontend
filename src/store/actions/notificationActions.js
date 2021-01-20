import { actionTypes } from "../types";

const fetchNotifications = (userId, pageNumber) => ({
  type: actionTypes.FETCH_NOTIFICATIONS,
  payload: {userId, pageNumber} ,
});
const fetchNotificationCount = (userId) => ({
  type: actionTypes.FETCH_NOTIFICATIONSCOUNT,
  payload: userId ,
});
const markAsRead = (userId) => ({
  type: actionTypes.MARK_AS_READ,
  payload: userId ,
});
const eraseCount = () => ({ type: actionTypes.ERASE_COUNT });

export default {
  fetchNotifications,
  fetchNotificationCount,
  markAsRead,
  eraseCount
};
