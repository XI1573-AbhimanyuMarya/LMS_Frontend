const API_HOST_PATH = process.env.REACT_APP_BASE_API_URL;
//'https://learningmanagementxeb.herokuapp.com';
// const API_HOST_PATH =  'https://xebia-lms.herokuapp.com'

export const SERVICE_URLS = {
  LOGIN: `${API_HOST_PATH}/username`,
  VERIFY_OTP: `${API_HOST_PATH}/password`,
  FETCH_COURSES: `${API_HOST_PATH}/api/getAllCourses`,
  FETCH_USERS: `${API_HOST_PATH}/getAllUsers`,
  CREATE_LEARNING_PATH: `${API_HOST_PATH}/api/learningPath`,
  ASSIGNED_PATH: `${API_HOST_PATH}/api/getAssignedLearningPaths`,
  MY_PATH: `${API_HOST_PATH}/employeelearning/myLearningPath`,
  DELETE_ALL_PATH: `${API_HOST_PATH}/employeelearning/deletelearningpath`,
};

export const API_STATUS = {
  SUCCESS: "success",
  FAILURE: "failure",
};

export const MESSAGES = {
  NO_DATA_FOUND: "No results found...",
  UNKNOWN_STEP: "Unknown step",
  PLEASE_SELECT_ATLEAST_ONE_COURSE: "Please select atleat one course",
};

export const LEARNING_PATH_LABELS = {
  CREATE_LEARNING_PATH: "Create Learning Path",
  LEARNING_PATH_DETAILS: "Please provide details below to add learning path",
  LEARNING_PATH_CREATED_AND_ASSIGNED:
    "Learning path has created & assigned successfully",
  LEARNING_PATH_CREATED: "Learning path has created sucessfully",
  EMAIL_SENT_TO_EMPLOYEE: "An email has been sent to the employees",
  SEARCH_COURSE: "Search Course",
  LEARNING_PATH_NAME: "Learning Path Name",
  COURSE_CATALOG: "Course Catalog",
  COURSE_CATALOG1: "Learning Path Completed",
  LEARNING_PATH_COMPLETED: "Learning Path Completed",
  COURSE_CAT: "Data Science",
  COURSE_CAT1: "Cloud Services",
  COURSE_CAT2: "Develompent",
  COURSE_CAT3: "Design (UX UI)",
  CHART_CATALOG: "Popular Learning Paths",
  MY_LEARNING_PATH: "My Learning Path",
  SEARCH_EMPLOYEE: "Search Employee",
  SELECT_LEARNING_PATH_DURATION: "Select Learning Path Duration",
  SOMETHING_WENT_WRONG: "Something went wrong!",
  CLICK_OVER_CLOSE_BUTTON: "Click over close button to create this again",
  ASSIGNED_LEARNING_PATH: "Assigned Learning Path for people",
  SEARCH_BY_MANAGER: "Search",
};

export const BUTTONS = {
  CLOSE: "Close",
  BACK: "Back",
  ASSIGN: "Assign",
  SUBMIT: "Submit",
  NEXT: "Next",
};

export const STEPS = ["Courses", "Assign Users", "Set Duration"];

export const MARKS = [
  {
    value: 3,
    label: "3 Months",
  },
  {
    value: 6,
    label: "6 Months",
  },
  {
    value: 9,
    label: "9 Months",
  },
  {
    value: 12,
    label: "12 Months",
  },
];

export const DRAWER_WIDTH = "18%";
