import { actionTypes } from '../types';

const fetchAllCourses = () => ({type: actionTypes.FETCH_COURSES_REQUEST});
const getFilteredCourses = (list) => ({type: actionTypes.GET_FILTERED_COURSES, payload: {list}});

export default {
    fetchAllCourses,
    getFilteredCourses
}