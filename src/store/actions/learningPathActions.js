import { actionTypes } from "../types";

const fetchAllCourses = () => ({ type: actionTypes.FETCH_COURSES_REQUEST });
const getFilteredCourses = (list) => ({
  type: actionTypes.GET_FILTERED_COURSES,
  payload: { list },
});
const getSelectedCourses = (list, courseIdArr) => ({
  type: actionTypes.GET_SELECTED_COURSES,
  payload: { list, courseIdArr },
});
const fetchAllUsers = () => ({ type: actionTypes.FETCH_USERS_REQUEST });
const getFilteredUsers = (list) => ({
  type: actionTypes.GET_FILTERED_USERS,
  payload: { list },
});
const getSelectedUsers = (list, userIdArr) => ({
  type: actionTypes.GET_SELECTED_USERS,
  payload: { list, userIdArr },
});
const getSliderDuration = (val) => ({
  type: actionTypes.GET_SLIDER_DURATION,
  payload: { val },
});
const getLearningPathName = (pathName) => ({
  type: actionTypes.GET_LEARNING_PATH_NAME,
  payload: { pathName },
});
const getLearningPathDes = (pathDes) => ({
  type: actionTypes.GET_LEARNING_PATH_DES,
  payload: { pathDes },
});
const getLearningPathLevel = (pathLevel) => ({
  type: actionTypes.GET_LEARNING_PATH_LEVEL,
  payload: { pathLevel },
});
const pathModelOpen = (val) => ({
  type: actionTypes.PATH_MODEL_OPEN,
  payload: { val },
});
const discardModelOpen = (val) => ({
  type: actionTypes.DISCARD_MODEL_OPEN,
  payload: { val },
});
const uploadFileModelOpen = (val) => (console.log("val",val),{
  type: actionTypes.UPLOADFILE_MODEL_OPEN,
  payload: { val },
});
const RejectModelOpen = (val) => (console.log("val",val),{
  type: actionTypes.REJECT,
  payload: { val },
});
const ApproveModelOpen = (val) => (console.log("val",val),{
  type: actionTypes.APPROVE,
  payload: { val },
});
const createLearningPath = (path) => ({
  type: actionTypes.CREATE_LEARNING_PATH_CALL_REQUEST,
  payload: { path },
});
const getFirstNextClicked = (val) => ({
  type: actionTypes.GET_FIRST_NEXT_CLICKED,
  payload: { val },
});
const getActivePathStep = (step) => ({
  type: actionTypes.GET_ACTIVE_PATH_STEP,
  payload: { step },
});
const getAssignedLearningPath = (managerEmail) => ({
  type: actionTypes.GET_ASSIGNED_LEARNING_PATH_REQUEST,
  payload: { managerEmail },
});
const getMyLearningPath = (employeeEmail) => ({
  type: actionTypes.GET_MY_LEARNING_PATH_REQUEST,
  payload: { employeeEmail },
});

const deleteAllPaths = (ids) => ({
  type: actionTypes.DELETE_ALL_PATH,
  payload: {ids},
});

const deletePath = (ids) => ({
  type: actionTypes.DELETE_PATH,
  payload: {ids},
});

const getPendingForApproval = (managerEmail) => ({
  type: actionTypes.GET_PENDING_APPROVAL,
  payload: { managerEmail },
});

export default {
  fetchAllCourses,
  getFilteredCourses,
  getSelectedCourses,
  fetchAllUsers,
  getFilteredUsers,
  getSelectedUsers,
  getSliderDuration,
  getLearningPathName,
  getLearningPathDes,
  getLearningPathLevel,
  pathModelOpen,
  discardModelOpen,
  createLearningPath,
  getFirstNextClicked,
  getActivePathStep,
  getAssignedLearningPath,
  getMyLearningPath,
  deleteAllPaths,
  deletePath,
  uploadFileModelOpen,
  RejectModelOpen,
  ApproveModelOpen,
  getPendingForApproval
};
