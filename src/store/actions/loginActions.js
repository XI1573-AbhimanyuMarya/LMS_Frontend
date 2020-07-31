import { actionTypes } from '../types';


const getUserDetails = (name, value) => ({ type: actionTypes.GET_USER_DETAILS, payload: { name, value } });
const validateUserEmail = username => ({ type: actionTypes.FETCH_OTP_REQUEST, payload: username });
const velidateOtp = (username, password) => ({ type: actionTypes.LOGIN_CALL_REQUEST, payload: { username, password } });
const logout = () => ({ type: actionTypes.LOGOUT_USER_REQUEST });

export default {
    getUserDetails,
    validateUserEmail,
    velidateOtp,
    logout,
}