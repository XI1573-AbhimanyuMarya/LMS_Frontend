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

export function* learningPathSaga() {
    yield takeLatest(actionTypes.FETCH_COURSES_REQUEST, fetchCourses);
    yield takeLatest(actionTypes.FETCH_USERS_REQUEST, fetchUsers);
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