import { takeLatest, call, put } from "redux-saga/effects";
import getOr from 'lodash/fp/getOr'
import axios from 'axios';
import { actionTypes } from '../types';
import { SERVICE_URLS } from '../../modules/constants';


const validateUserEmail = async (username) => {
    return await axios.post(SERVICE_URLS.LOGIN, { username });
}

const verifyOtp = async ({ username, password }) => {
    return await axios.post(SERVICE_URLS.VERIFY_OTP, { username, password });
}

const setUserData = (userData) => {
    localStorage.setItem("USER_INFO", JSON.stringify(userData))
}

export function* loginSaga() {
    yield takeLatest(actionTypes.FETCH_OTP_REQUEST, fetchOtp)
    yield takeLatest(actionTypes.LOGIN_CALL_REQUEST, login);
}

function* fetchOtp(action) {
    try {
        const response = yield call(validateUserEmail, action.payload);
        const { data } = response;

        yield put({ type: actionTypes.FETCH_OTP_SUCCESS, payload: data });

    } catch (error) {
        const { response } = error;
        const { data } = response
        yield put({ type: actionTypes.FETCH_OTP_ERROR, payload: data });
    }
}

function* login(action) {
    try {
        const response = yield call(verifyOtp, action.payload);
        const { data } = response;

        yield put({ type: actionTypes.LOGIN_CALL_SUCCESS, payload: data });
        if (getOr(null, 'login.islogin', data)) {
            yield call(setUserData, data)
        }

    } catch (error) {
        const { response } = error;
        const { data } = response
        yield put({ type: actionTypes.LOGIN_CALL_FAILURE, payload: data });
    }
}