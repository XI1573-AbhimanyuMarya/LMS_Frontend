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

const logout = () => {
    localStorage.removeItem("USER_INFO");
}

export function* loginSaga() {
    yield takeLatest(actionTypes.FETCH_OTP_REQUEST, fetchOtp);
    yield takeLatest(actionTypes.LOGIN_CALL_REQUEST, login);
    yield takeLatest(actionTypes.LOGOUT_USER_REQUEST, logoutUser);
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
        console.log(action);
        const response = yield call(verifyOtp, action.payload);
        const { data } = response;

        yield put({ type: actionTypes.LOGIN_CALL_SUCCESS, payload: data });
        if (getOr(null, 'login.islogin', data)) {
            const {history} = action.payload;
            yield call(setUserData, data)
            history.push('/')
        }

    } catch (error) {
        const { response } = error;
        const { data } = response
        yield put({ type: actionTypes.LOGIN_CALL_FAILURE, payload: data });
    }
}

function* logoutUser(action) {
    try {
        yield call(logout)
        yield put({ type: actionTypes.LOGOUT_USER_SUCCESS })
    } catch (error) {
        yield put({ type: actionTypes.LOGOUT_USER_ERROR })
    }
}