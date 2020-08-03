import { fork, all } from 'redux-saga/effects';
import { loginSaga } from './loginSaga';
import { learningPathSaga } from './learningPathSaga';

export default function* rootSaga() {
    yield all([
        fork(loginSaga),
        fork(learningPathSaga)
    ]);
}