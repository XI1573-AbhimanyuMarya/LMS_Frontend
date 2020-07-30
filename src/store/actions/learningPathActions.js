import { actionTypes } from '../types';

const fetchAllCourses = () => ({type: actionTypes.FETCH_COURSES_REQUEST});
const getFilteredCourses = (list) => ({type: actionTypes.GET_FILTERED_COURSES, payload: {list}});
const getSelectedCourses = (list) => ({type: actionTypes.GET_SELECTED_COURSES, payload: {list}});
const fetchAllUsers = () => ({type: actionTypes.FETCH_USERS_REQUEST});
const getFilteredUsers = (list) => ({type: actionTypes.GET_FILTERED_USERS, payload: {list}});
const getSelectedUsers = (list) => ({type: actionTypes.GET_SELECTED_USERS, payload: {list}});

export default {
    fetchAllCourses,
    getFilteredCourses,
    getSelectedCourses,
    fetchAllUsers,
    getFilteredUsers,
    getSelectedUsers,
}