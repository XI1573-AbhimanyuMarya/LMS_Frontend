import { actionTypes } from '../types';

const initialState = {
    learningPathName: '',
    courses: [],
    courseIdArr: [],
    users: [],
    userIdArr: [],
    learningPathDuration: 3,
    isLoading: false,
    pathModelOpen: false,
    discardModelOpen: false,
    firstNextClicked: false,
    activePathStep: '',
    errorMessage: '',
    mycourses: [],
    assignedCources:[]
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
                courseIdArr: payload.courseIdArr,
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
                userIdArr: payload.userIdArr,
                isLoading: false
            };
        case actionTypes.GET_SLIDER_DURATION:
            return {
                ...state,
                learningPathDuration: payload.val,
                isLoading: false
            }
        case actionTypes.GET_LEARNING_PATH_NAME:
            return {
                ...state,
                learningPathName: payload.pathName,
                isLoading: false
            }
        case actionTypes.PATH_MODEL_OPEN:
            if (payload.val === true) {
                return {
                    ...state,
                    pathModelOpen: payload.val,
                    isLoading: false
                }
            } else {
                delete state.filteredCoursesList;
                delete state.filteredUsersList;
                return {
                    ...state,
                    pathModelOpen: payload.val,
                    learningPathName: '',
                    courses: [],
                    users: [],
                    courseIdArr: [],
                    userIdArr: [],
                    isLoading: false,
                    activePathStep: '',
                    firstNextClicked: false
                }
            }
        case actionTypes.DISCARD_MODEL_OPEN:
            return {
                ...state,
                discardModelOpen: payload.val,
                isLoading: false
            }
        case actionTypes.CREATE_LEARNING_PATH_CALL_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case actionTypes.CREATE_LEARNING_PATH_CALL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                message: payload.message,
                status: payload.status
            }
        case actionTypes.CREATE_LEARNING_PATH_CALL_FAILURE:
            return {
                ...state,
                isLoading: false,
                message: payload.message,
                status: payload.status
            }
        case actionTypes.GET_FIRST_NEXT_CLICKED:
            return {
                ...state,
                firstNextClicked: payload.val,
            }
        case actionTypes.GET_ACTIVE_PATH_STEP:
            return {
                ...state,
                activePathStep: payload.step,
            }

        case actionTypes.GET_ASSIGNED_LEARNING_PATH_REQUEST:
            return {
                ...state,
                isLoading: true,
                errorMessage: ''
            };
        case actionTypes.GET_ASSIGNED_LEARNING_PATH_SUCCESS:
            return {
                ...state,
                assignedCources: payload,
                isLoading: false,
                errorMessage: ''
            };
        case actionTypes.GET_ASSIGNED_LEARNING_PATH_FAILURE:
            return {
                ...state,
                assignedCources: [],
                isLoading: false,
                errorMessage: payload.error
            };

        case actionTypes.GET_MY_LEARNING_PATH_REQUEST:
            return {
                ...state,
                isLoading: true,
                errorMessage: ''
            };
        case actionTypes.GET_MY_LEARNING_PATH_SUCCESS:
            return {
                ...state,
                mycourses: payload,
                isLoading: false,
                errorMessage: ''
            };
        case actionTypes.GET_MY_LEARNING_PATH_FAILURE:
            return {
                ...state,
                mycourses: [],
                isLoading: false,
                errorMessage: payload.error
            };
        default: return state;
    }
}
