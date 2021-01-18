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
const openBtn = (course) => ({
  type: actionTypes.SHOW_BUTTON_BASED_ON_RATE,
  payload: {course}
});
const pathModelOpen = (val) => ({
  type: actionTypes.PATH_MODEL_OPEN,
  payload: { val },
});
const clearCreateLpFormFields=()=>({
  type: actionTypes.CLEAR_CREATE_LP_FORM,
  payload: "",
});
const discardModelOpen = (val) => ({
  type: actionTypes.DISCARD_MODEL_OPEN,
  payload: { val },
});
const openDetails = (val, learningId) => ({
  type: actionTypes.OPEN_DETAIL_EMP,
  payload: { val, id: learningId },
});
const setDeletedEmp = (val) => ({
  type: actionTypes.SET_DELETED_EMP,
  payload: { val },
});
const uploadFileModelOpen = (val) => ({
  type: actionTypes.UPLOADFILE_MODEL_OPEN,
  payload: { val },
});
const RejectModelOpen = (val) => ({
  type: actionTypes.REJECT,
  payload: { val },
});
const ApproveModelOpen = (val) => ({
  type: actionTypes.APPROVE,
  payload: { val },
});
const createLearningPath = (path) => ({
  type: actionTypes.CREATE_LEARNING_PATH_CALL_REQUEST,
  payload: { path },
});
//function to assign created learning path to user
const createAssignLearningPath = (path) => ({
  type: actionTypes.CREATE_ASSIGNED_LEARNING_PATH_CALL_REQUEST,
  payload: {path} ,
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
//get list of created learning path courses 
const getLearningPath = (assigneeId) =>({             //by hanifa
type: actionTypes.GET_LEARNING_PATH_REQUEST,
payload:{ assigneeId }
})
const deleteAllPaths = (ids) => ({
  type: actionTypes.DELETE_ALL_PATH,
  payload: {ids},
});

const deletePath = (ids) => ({
  type: actionTypes.DELETE_PATH,
  payload: {ids},
});

const getLearningPathCourses=(reqBody)=>({
  type:actionTypes.GET_LEARNING_PATH_COURSES_REQUEST,
  payload: {...reqBody}
});

const changeCourseRate = (changeRate,course) => ({
  type: actionTypes.CHANGE_COURSE_RATE,
  payload: {changeRate,course}
});
const saveCourseRate = (reqBody) => ({
  type: actionTypes.SAVE_COURSE_RATE,
  payload: { reqBody }
});

const getPendingForApproval = (managerEmail) => ({
  type: actionTypes.GET_PENDING_APPROVAL,
  payload: { managerEmail },
});

const getApprovalRejects = (reqBody) => ({
  type: actionTypes.GET_APPROVAL_REJECTION,
  payload: reqBody,
});

const viewAttachment = (reqBody) => ({
  type: actionTypes.VIEW_ATTACHMENT,
  payload: reqBody,
});

const addCertificate= (files) => ({
  type: actionTypes.ADD_CERTIFICATE,
  payload: files
});

const uploadCertificate=(reqBody)=>({
  type:actionTypes.UPLOAD_CERTIFICATE,
  payload:{reqBody}
});

const selectLearningPath=(reqBody)=>({
  type:actionTypes.SELECTED_LEARNING_PATH,
  payload:reqBody
});

const changeDocUploadedStatusForCourse=(courseId)=>({
  type:actionTypes.CHANGE_DOC_UPLOAD_STATUS_FOR_COURSE,
  payload:{courseId}
});

const sendForApproval = (reqBody) => ({
  type: actionTypes.SEND_APPROVAL,
  payload: reqBody,
});

const getManagerStats=(managerEmail)=>({
  type:actionTypes.MANAGER_DASHBOARD_STATS_REQUEST,
  payload:{managerEmail}
});

const getAdminStats=(userRole)=>({
  type:userRole
});

const getAdminLearningPathDetails = () => ({
  type:actionTypes.ADMIN_LEARNING_PATH_DETAILS_REQUEST
})

const getAdminDetails = (empId) => ({
  type:actionTypes.ADMIN_DETAILS_REQUEST,
  payload: {empId}
})

const getPopularStuff=(assigneeId)=>({
  type:actionTypes.POPULAR_STUFF_REQUEST,
  payload:{assigneeId}
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
  openBtn,
  pathModelOpen,
  discardModelOpen,
  openDetails,
  setDeletedEmp,
  createLearningPath,
  createAssignLearningPath,
  getFirstNextClicked,
  getActivePathStep,
  getAssignedLearningPath,
  getMyLearningPath,
  getLearningPath,
  deleteAllPaths,
  deletePath,
  getLearningPathCourses,
  changeCourseRate,
  uploadFileModelOpen,
  // uploadFileModelOpen,
  RejectModelOpen,
  ApproveModelOpen,
  getPendingForApproval,
  getApprovalRejects,
  saveCourseRate,
  viewAttachment,
  addCertificate,
  uploadCertificate,
  selectLearningPath,
  clearCreateLpFormFields,
  sendForApproval,

  changeDocUploadedStatusForCourse,

  getManagerStats,
  getAdminStats,
  getAdminLearningPathDetails,
  getAdminDetails,
  getPopularStuff
};
