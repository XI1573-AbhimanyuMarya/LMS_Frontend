const API_HOST_PATH = 'https://learningmanagementxebia.herokuapp.com';

export const SERVICE_URLS = {
    LOGIN: `${API_HOST_PATH}/username`,
    VERIFY_OTP: `${API_HOST_PATH}/password`
}

export const API_STATUS = {
    SUCCESS: 'success',
    FAILURE: 'failure',
}

export const MESSAGES = {
    NO_DATA_FOUND: 'No results found...',
};