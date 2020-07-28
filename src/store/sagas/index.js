import { fork } from 'redux-saga/effects';
import { loginSaga } from './loginSaga';

export default function* rootSaga() {
    yield [
        fork(loginSaga)
    ];
}