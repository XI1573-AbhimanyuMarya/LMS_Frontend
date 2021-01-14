import { combineReducers } from 'redux';
import { learningPathReducer } from './learningPathReducer';
import { loginReducer } from './loginReducer';
import { notificationReducer } from './notificationReducer';

export default combineReducers({
    learningPathState: learningPathReducer,
    loginState: loginReducer,
    notificationState: notificationReducer
});

