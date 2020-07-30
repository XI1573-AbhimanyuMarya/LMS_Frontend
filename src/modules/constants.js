const API_HOST_PATH = 'https://learningmanagementxeb.herokuapp.com';

export const SERVICE_URLS = {
    LOGIN: `${API_HOST_PATH}/username`,
    VERIFY_OTP: `${API_HOST_PATH}/password`,
    FETCH_COURSES: `${API_HOST_PATH}/api/getAllCourses`,
    FETCH_USERS: `${API_HOST_PATH}/getAllUsers`
}

export const API_STATUS = {
    SUCCESS: 'success',
    FAILURE: 'failure',
}

export const MESSAGES = {
    NO_DATA_FOUND: 'No results found...',
};