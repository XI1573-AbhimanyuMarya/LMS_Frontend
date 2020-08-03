import { combineReducers } from 'redux';
import { learningPathReducer } from './learningPathReducer';
import { loginReducer } from './loginReducer';

export default combineReducers({
    learningPathState: learningPathReducer,
    loginState: loginReducer
});

