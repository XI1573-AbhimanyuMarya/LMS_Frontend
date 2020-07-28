import { takeLatest, call, put } from "redux-saga/effects";
import { actionTypes } from '../types';
import { validateUserEmail, verifyOtp } from '../../modules/authServices';


export function* loginSaga() {
    yield takeLatest(actionTypes.LOGIN_CALL_REQUEST, workerSaga);
}

function* workerSaga() {
    try {
        const response = yield call(validateUserEmail);
        const user = response.data;

        yield put({ type: actionTypes.LOGIN_CALL_SUCCESS, user });

    } catch (error) {
        yield put({ type: actionTypes.LOGIN_CALL_FAILURE, error });
    }
}