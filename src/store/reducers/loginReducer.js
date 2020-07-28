import { actionTypes } from '../types';

const initialState = {
    isLoading: false,
    username: '',
    password: '',
    isValidEmail: true,
    isValidOtp: true,
    message: '',
    sendOtp: false
}

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_CALL_REQUEST:
            return { ...state, login: true, error: null };
        case actionTypes.LOGIN_CALL_SUCCESS:
            return { ...state, login: false, user: action.user };
        case actionTypes.LOGIN_CALL_FAILURE:
            return { ...state, login: false, user: null, error: action.error };
        default: return state;
    }
}
