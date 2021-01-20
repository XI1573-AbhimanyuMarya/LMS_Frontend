import { takeLatest, call, put } from "redux-saga/effects";
import axios from 'axios';
import { actionTypes } from '../types';
import { SERVICE_URLS } from '../../modules/constants';
import { authHeader } from '../../modules/authServices'; 

const fetchAllNotifications = async (postData) => {
  const userId = postData.payload.userId
  const pageNumber = postData.payload.pageNumber
  return await axios.get(SERVICE_URLS.FETCH_NOTIFICATIONS + `/notification/api/v1/employee?userId= `+ userId +`&pageNo=`+ pageNumber +`&pageSize=6`, { headers: authHeader() });
}

const fetchCount = async (data) => {
  const userId = data.payload
  return await axios.get(SERVICE_URLS.FETCH_NOTIFICATIONS + `/notification/api/v1/unread/count?userId=`+ userId, { headers: authHeader() });
}

const resetCount = async (data) => {
  const userId = data.payload
  return await axios.put(SERVICE_URLS.FETCH_NOTIFICATIONS + `/notification/api/v1/mark/read?userId=`+ userId, {},  { headers: authHeader() });
}

export function* notificationSaga() {
  yield takeLatest(actionTypes.FETCH_NOTIFICATIONS, fetchNotifications);
  yield takeLatest(actionTypes.FETCH_NOTIFICATIONSCOUNT, fetchNotificationCount);
  yield takeLatest(actionTypes.MARK_AS_READ, markAsRead);
  yield takeLatest(actionTypes.ERASE_COUNT, eraseCount);
}

function* eraseCount(){
  yield put({ type: actionTypes.ERASE_COUNT_SUCCESS, payload: 0 });
}

function* fetchNotifications(postData) {
  try {
    const response = yield call(fetchAllNotifications, postData);
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
function* markAsRead(userId){
  try {
    const response = yield call(resetCount, userId);
    const { data } = response;
    yield put({ type: actionTypes.READ_SUCCESS, payload: data });

  } catch (error) {
    yield put({ type: actionTypes.READ_FAILURE, error });
  }
 
}



