// const API_HOST_PATH = process.env.REACT_APP_BASE_API_URL;
import Beginner from '../images/101-Beginner.svg';
import Intermediate from '../images/102-Intermediate.svg';
import Advance from '../images/103-Advance.svg';
import Expert from '../images/104-Expert.svg';
import OutlinedBeginner from '../images/101-OutlinedBeginner.svg';
import OutlinedIntermediate from '../images/102-OutlinedIntermediate.svg';
import OutlinedAdvance from '../images/103-OutlinedAdvance.svg';
import OutlinedExpert from '../images/104-OutlinedExpert.svg';


const API_HOST_PATH =  'http://localhost:8085'
// const API_HOST_PATH =  'https://xebia-lms.herokuapp.com'

export const SERVICE_URLS = {
LOGIN: `${API_HOST_PATH}/username`,
VERIFY_OTP: `${API_HOST_PATH}/password`,
FETCH_COURSES: `${API_HOST_PATH}/course/api/v1/allcourses`,
FETCH_USERS: `${API_HOST_PATH}/user/api/v1/get/all/employees`,
CREATE_LEARNING_PATH: `${API_HOST_PATH}/manager/api/v1/create/learningPath`,
ASSIGNED_PATH: `${API_HOST_PATH}/manager/api/v1/manage/learningPaths/assigned`,
CREATE_ASSIGNED_PATH: `${API_HOST_PATH}/manager/api/v1/assign/learningPaths`,
MY_PATH: `${API_HOST_PATH}/employee/api/v1/mylearningpaths`,
GET_LEARNING_PATH:`${API_HOST_PATH}/manager/api/v1/details/learningPaths`,  //Get List of learning paths
DELETE_ALL_PATH: `${API_HOST_PATH}/employee/api/v1/delete/learningpath`,
LEARNINGPATH_COURSES:`${API_HOST_PATH}/manager/api/v1/learningPath/courses/`,
PENDING_FOR_APPROVAL: `${API_HOST_PATH}/manager/api/v1/pending/approvals`,
APPROVAL_REJEACT: `${API_HOST_PATH}/manager/api/v1/review/approvals`,
SAVE_COURSE_RATE: `${API_HOST_PATH}/employee/api/v1/update/courseratings`,
GET_ATTACHMENT:`${API_HOST_PATH}/certificate/api/v1/get`,
UPLOAD_CERTIFICATES:`${API_HOST_PATH}/certificate/api/v1/upload`

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
  LEARNING_PATH_NAME: "Enter Learning Path Name",
  LEARNING_PATH_DESCRIPTION: "Enter Learning Path Description",
  COURSE_CATALOG: "Course Catalog",
  COURSE_CATALOG1: "Learning Path Completed",
  COURSE_CATALOG2: "Assign Learning Path",
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

export const STEPS = ["Learning Path Details", "Courses", "Assign Users", "Set Duration"];
export const STEPS1 = [ "Learning Path", "Assign Users", "Set Duration"];

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

export const SHOW_LEVELS={
  "101-Beginner":Beginner,
  "102-Intermediate":Intermediate,
  "103-Advance":Advance,
  "104-Expert":Expert,
  "101-OutlinedBeginner":OutlinedBeginner,
  "102-OutlinedIntermediate":OutlinedIntermediate,
  "103-OutlinedAdvance":OutlinedAdvance,
  "104-OutlinedExpert":OutlinedExpert
};

export const LEVELS=[
  {id:101,value:"Beginner"},
  {id:102,value:"Intermediate"},
  {id:103,value:"Advance"},
  {id:104,value:"Expert"}
];