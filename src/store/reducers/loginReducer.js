import { actionTypes } from '../types';

const initialState = {
    isLoading: false,
    username: '',
    password: '',
    isValidEmail: true,
    isValidOtp: true,
    message: '',
    sendOtp: false,
    login: null
}

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
                login: payload.login
            }
        case actionTypes.LOGIN_CALL_FAILURE:
            return {
                ...state,
                isLoading: false,
                message: payload.message,
                isValidOtp: false
            }

        default: return state;
    }
}
