import { takeLatest, call, put } from "redux-saga/effects";
import axios from 'axios';
import { actionTypes } from '../types';
import { SERVICE_URLS } from '../../modules/constants';


const validateUserEmail = async (username) => {
    return await axios.post(SERVICE_URLS.LOGIN, { username });
}

const verifyOtp = async ({ username, password }) => {
    return await axios.post(SERVICE_URLS.VERIFY_OTP, { username, password });
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
        yield put({ type: actionTypes.FETCH_OTP_ERROR, error });
    }
}

function* login(action) {
    try {
        const response = yield call(verifyOtp, action.payload);
        const { data } = response;

        yield put({ type: actionTypes.LOGIN_CALL_SUCCESS, payload: data });

    } catch (error) {
        yield put({ type: actionTypes.LOGIN_CALL_FAILURE, error });
    }
}