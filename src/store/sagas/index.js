import { fork, all } from 'redux-saga/effects';
import { loginSaga } from './loginSaga';
import { learningPathSaga } from './learningPathSaga';
import { notificationSaga } from './notificationSaga';

export default function* rootSaga() {
    yield all([
        fork(loginSaga),
        fork(learningPathSaga),
        fork(notificationSaga)
    ]);
}