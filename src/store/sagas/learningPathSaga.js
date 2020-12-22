import { takeLatest, call, put } from "redux-saga/effects";
import axios from 'axios';
import { actionTypes } from '../types';
import { SERVICE_URLS } from '../../modules/constants';
import { authHeader } from '../../modules/authServices';

const fetchAllCourses = async () => {
  return await axios.get(SERVICE_URLS.FETCH_COURSES, { headers: authHeader() });
}

const fetchAllUsers = async () => {
  return await axios.get(SERVICE_URLS.FETCH_USERS, { headers: authHeader() });
}

const createLearningPath = async ({ path }) => {
  return await axios.post(SERVICE_URLS.CREATE_LEARNING_PATH, { path }, { headers: authHeader() });
}

export function* learningPathSaga() {
  yield takeLatest(actionTypes.FETCH_COURSES_REQUEST, fetchCourses);
  yield takeLatest(actionTypes.FETCH_USERS_REQUEST, fetchUsers);
  yield takeLatest(actionTypes.CREATE_LEARNING_PATH_CALL_REQUEST, createLearning);
  yield takeLatest(actionTypes.GET_ASSIGNED_LEARNING_PATH_REQUEST, getAssignedLearningPaths);
  yield takeLatest(actionTypes.GET_MY_LEARNING_PATH_REQUEST, getMyLearningPath);
  yield takeLatest(actionTypes.DELETE_ALL_PATH, deleteAllPaths);
  yield takeLatest(actionTypes.DELETE_PATH, deletePaths);

  yield takeLatest(actionTypes.GET_LEARNING_PATH_COURSES_REQUEST, getLearningPathCourses);
  yield takeLatest(actionTypes.GET_PENDING_APPROVAL, getPendingForApproval);
  yield takeLatest(actionTypes.GET_APPROVAL_REJECTION, getApprovalRejects);

  yield takeLatest(actionTypes.SAVE_COURSE_RATE, saveCourseRate);  
}

function* fetchCourses() {
  try {
    const response = yield call(fetchAllCourses);
    const { data } = response;

    yield put({ type: actionTypes.FETCH_COURSES_SUCCESS, payload: data });

  } catch (error) {
    yield put({ type: actionTypes.FETCH_COURSES_FAILURE, error });
  }
}

function* fetchUsers() {
  try {
    const response = yield call(fetchAllUsers);
    const { data } = response;

    yield put({ type: actionTypes.FETCH_USERS_SUCCESS, payload: data });

  } catch (error) {
    yield put({ type: actionTypes.FETCH_USERS_FAILURE, error });
  }
}

function* createLearning(action) {
  try {
    const response = yield call(createLearningPath, action.payload);
    const { data } = response;
    yield put({ type: actionTypes.CREATE_LEARNING_PATH_CALL_SUCCESS, payload: data });

  } catch (error) {
    const { response } = error;
    const { data } = response
    yield put({ type: actionTypes.CREATE_LEARNING_PATH_CALL_FAILURE, payload: data });
  }
}

const fetchPath = async ({ managerEmail }) => {
  return await axios.post(SERVICE_URLS.ASSIGNED_PATH, { managerEmail }, { headers: authHeader() });
}

function* getAssignedLearningPaths(action) {
  try {
    const response = yield call(fetchPath, action.payload);
    const { data } = response;
    yield put({ type: actionTypes.GET_ASSIGNED_LEARNING_PATH_SUCCESS, payload: data });

  } catch (error) {
    yield put({ type: actionTypes.GET_ASSIGNED_LEARNING_PATH_FAILURE, payload: error });
  }
}
const fetchMyPath = async ({ employeeEmail }) => {
  return await axios.post(SERVICE_URLS.MY_PATH, { employeeEmail }, { headers: authHeader() });
}

function* getMyLearningPath(action) {
  try {
    const response = yield call(fetchMyPath, action.payload);
    const { data } = response;
    yield put({ type: actionTypes.GET_MY_LEARNING_PATH_SUCCESS, payload: data });

  } catch (error) {
    yield put({ type: actionTypes.GET_MY_LEARNING_PATH_FAILURE, payload: error });
  }
}
const deleteAllPath = async ({ ids }) => {
  return await axios.post(SERVICE_URLS.DELETE_ALL_PATH, { ids }, { headers: authHeader() });
}

function* deleteAllPaths(action) {
  try {
    const response = yield call(deleteAllPath, action.payload);
    const { data } = response;
    yield put({ type: actionTypes.DELETE_ALL_PATH_SUCCESS, payload: data });

  } catch (error) {
    yield put({ type: actionTypes.DELETE_ALL_PATH_FAILURE, payload: error });
  }
}

const deletePath = async ({ ids }) => {
  return await axios.post(SERVICE_URLS.DELETE_ALL_PATH, { ids }, { headers: authHeader() });
}

function* deletePaths(action) {
  try {
    const response = yield call(deleteAllPath, action.payload);
    const { data } = response;
    yield put({ type: actionTypes.DELETE_PATH_SUCCESS, payload: data });

  } catch (error) {
    yield put({ type: actionTypes.DELETE_PATH_FAILURE, payload: error });
  }
}

const fetchPathCourses = async ({ ids,empid }) => {
  return await axios.get(SERVICE_URLS.LEARNINGPATH_COURSES+ids+'/'+empid, { headers: authHeader() });
}

function* getLearningPathCourses(action) {
  try {
    const response = yield call(fetchPathCourses, action.payload);
    const { data } = response;
    yield put({ type: actionTypes.GET_LEARNING_PATH_COURSES_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: actionTypes.GET_LEARNING_PATH_COURSES_FAILURE, payload: error });
  }
}
const getPFApproval = async ({ managerEmail }) => {
  return await axios.post(SERVICE_URLS.PENDING_FOR_APPROVAL, { managerEmail }, { headers: authHeader() });
}

function* getPendingForApproval(action) {
  try {
    const response = yield call(getPFApproval,action.payload);
    const { data } = response;

    yield put({ type: actionTypes.FETCH_PENDING_FOR_APPROVAL_SUCCESS, payload: data });

  } catch (error) {
    yield put({ type: actionTypes.FETCH_PENDING_FOR_APPROVAL_FAILURE, error });
  }
}

const getApprovalReject = async ({ reqBody }) => {
  return await axios.put(SERVICE_URLS.APPROVAL_REJEACT, { ...reqBody }, { headers: authHeader() });
}

function* getApprovalRejects(action) {
  try {
    const response = yield call(getApprovalReject,action.payload);
    const { data } = response;
    yield put({ type: actionTypes.FETCH_APPROVAL_SUCCESS, payload: data });

  } catch (error) {
    yield put({ type: actionTypes.FETCH_APPROVAL_FAILURE, error });
  }
}

const saveCourseRateRequest = async ({ reqBody }) => {
  return await axios.put(SERVICE_URLS.SAVE_COURSE_RATE, { ...reqBody }, { headers: authHeader() });
}

function* saveCourseRate(action) {
  try {
    const response = yield call(saveCourseRateRequest,action.payload);
    const { data } = response;

    yield put({ type: actionTypes.SAVE_COURSE_RATE_SUCCESS, payload: data });

  } catch (error) {
    yield put({ type: actionTypes.SAVE_COURSE_RATE_FAILURE, error });
  }
}