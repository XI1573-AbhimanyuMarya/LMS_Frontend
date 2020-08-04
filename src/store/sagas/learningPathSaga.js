import { takeLatest, call, put } from "redux-saga/effects";
import axios from 'axios';
import { actionTypes } from '../types';
import { SERVICE_URLS } from '../../modules/constants';
import { authHeader } from '../../modules/authServices';

const fetchAllCourses = async () => {
    return await axios.get(SERVICE_URLS.FETCH_COURSES, { headers: authHeader()});
}

const fetchAllUsers = async () => {
    return await axios.get(SERVICE_URLS.FETCH_USERS, { headers: authHeader()});
}

const createLearningPath = async ({path}) => {
    return await axios.post(SERVICE_URLS.CREATE_LEARNING_PATH, { path }, { headers: authHeader()});
}

export function* learningPathSaga() {
    yield takeLatest(actionTypes.FETCH_COURSES_REQUEST, fetchCourses);
    yield takeLatest(actionTypes.FETCH_USERS_REQUEST, fetchUsers);
    yield takeLatest(actionTypes.CREATE_LEARNING_PATH_CALL_REQUEST, createLearning);
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