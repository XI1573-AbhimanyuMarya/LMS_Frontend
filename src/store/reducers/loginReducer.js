import { actionTypes } from '../types';

const defaultState = {
    isLoading: false,
    username: '',
    password: '',
    isValidEmail: true,
    isValidOtp: true,
    message: '',
    sendOtp: false,
    login: {
        jwt: '',
        islogin: false
    },
    user: {

    },
    status: null
}

const userInfo = JSON.parse(localStorage.getItem('USER_INFO'));

const initialState = userInfo ?
    { ...defaultState, login: { ...userInfo.login }, user: { ...userInfo.user } }
    : defaultState;

export const loginReducer = (state = initialState, action) => {
    const { payload } = action;
    switch (action.type) {
        case actionTypes.GET_USER_DETAILS:
            return {
                ...state,
                [payload.name]: payload.value,
                isValidEmail: true,
                isValidOtp: true
            }

        case actionTypes.FETCH_OTP_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.FETCH_OTP_SUCCESS:
            return {
                ...state,
                message: payload.message,
                isValidEmail: true,
                sendOtp: true,
                isLoading: false
            };
        case actionTypes.FETCH_OTP_ERROR:
            return {
                ...state,
                message: payload.message,
                isValidEmail: false,
                isLoading: false
            };

        case actionTypes.LOGIN_CALL_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case actionTypes.LOGIN_CALL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                message: payload.message,
                isValidOtp: true,
                login: { ...payload.login },
                user: { ...payload.user },
                status: payload.status
            }
        case actionTypes.LOGIN_CALL_FAILURE:
            return {
                ...state,
                isLoading: false,
                message: payload.message,
                isValidOtp: false,
                status: payload.status
            }

        default: return state;
    }
}
