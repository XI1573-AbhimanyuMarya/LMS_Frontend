import { combineReducers } from 'redux';
import { courseReducer } from './courseReducer';
import { loginReducer } from './loginReducer';

export default combineReducers({
    courseState: courseReducer,
    loginState: loginReducer
});

