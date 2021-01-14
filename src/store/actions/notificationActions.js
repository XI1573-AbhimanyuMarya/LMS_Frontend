import { actionTypes } from "../types";

const fetchNotifications = (userId) => ({
  type: actionTypes.FETCH_NOTIFICATIONS,
  payload: userId ,
});
const fetchNotificationCount = (userId) => ({
  type: actionTypes.FETCH_NOTIFICATIONSCOUNT,
  payload: userId ,
});
const eraseCount = () => ({ type: actionTypes.ERASE_COUNT });

export default {
  fetchNotifications,
  fetchNotificationCount,
  eraseCount
};
