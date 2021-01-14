import { takeLatest, call, put } from "redux-saga/effects";
import axios from 'axios';
import { actionTypes } from '../types';
import { SERVICE_URLS } from '../../modules/constants';
import { authHeader } from '../../modules/authServices'; 

const fetchAllNotifications = async (data) => {
  const userId = data.payload
  return await axios.get(SERVICE_URLS.FETCH_NOTIFICATIONS + `/notification/api/v1/employee?userId= `+ userId +`&pageNo=0&pageSize=6`, { headers: authHeader() });
}
const fetchCount = async (data) => {
  const userId = data.payload
  return await axios.get(SERVICE_URLS.FETCH_NOTIFICATIONS + `/notification/api/v1/unread/count?userId=`+ userId, { headers: authHeader() });
}
export function* notificationSaga() {
  yield takeLatest(actionTypes.FETCH_NOTIFICATIONS, fetchNotifications);
  yield takeLatest(actionTypes.FETCH_NOTIFICATIONSCOUNT, fetchNotificationCount);
  yield takeLatest(actionTypes.ERASE_COUNT, eraseCount);
}

function* eraseCount(){
  yield put({ type: actionTypes.ERASE_COUNT_SUCCESS, payload: 0 });
}

function* fetchNotifications(userId) {
  try {
    const response = yield call(fetchAllNotifications, userId);
    const { data } = response;

    yield put({ type: actionTypes.FETCH_NOTIFICATIONS_SUCCESS, payload: data });

  } catch (error) {
    yield put({ type: actionTypes.FETCH_NOTIFICATIONS_FAILURE, error });
  }
}

function* fetchNotificationCount(userId){
  try {
    const response = yield call(fetchCount, userId);
    const { data } = response;

    yield put({ type: actionTypes.FETCH_NOTIFICATIONCOUNT_SUCCESS, payload: data });

  } catch (error) {
    yield put({ type: actionTypes.FETCH_NOTIFICATIONSCOUNT_FAILURE, error });
  }
}



