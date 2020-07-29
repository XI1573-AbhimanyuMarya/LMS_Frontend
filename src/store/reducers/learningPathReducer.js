import { actionTypes } from '../types';

const initialState = {
    courses: [],
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

        default: return state;
    }
}
