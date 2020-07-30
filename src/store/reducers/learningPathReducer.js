import { actionTypes } from '../types';

const initialState = {
    courses: [],
    users: [],
    isLoading: false,
}

export const learningPathReducer = (state = initialState, action) => {
    const { payload } = action;
    switch (action.type) {
        case actionTypes.FETCH_COURSES_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.FETCH_COURSES_SUCCESS:
            return {
                ...state,
                courses: payload,
                isLoading: false
            };
        case actionTypes.FETCH_COURSES_FAILURE:
            return {
                ...state,
                courses: payload,
                isLoading: false
            };
        case actionTypes.GET_FILTERED_COURSES:
            return {
                ...state,
                filteredCoursesList: payload.list,
                isLoading: false
            };
        case actionTypes.GET_SELECTED_COURSES:
            return {
                ...state,
                courses: payload.list,
                isLoading: false
            };     
        case actionTypes.FETCH_USERS_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.FETCH_USERS_SUCCESS:
            return {
                ...state,
                users: payload,
                isLoading: false
            };
        case actionTypes.FETCH_USERS_FAILURE:
            return {
                ...state,
                users: payload,
                isLoading: false
            };    
        case actionTypes.GET_FILTERED_USERS:
            return {
                ...state,
                filteredUsersList: payload.list,
                isLoading: false
            };
        case actionTypes.GET_SELECTED_USERS:
            return {
                ...state,
                users: payload.list,
                isLoading: false
            };    
        default: return state;
    }
}
