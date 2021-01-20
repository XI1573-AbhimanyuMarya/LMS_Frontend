import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import { actionTypes } from "../types";
import { SERVICE_URLS } from "../../modules/constants";
import { authHeader } from "../../modules/authServices";
// import { useSelector } from "react-redux";
// const userRole = sessionStorage["USER_INFO"]
//   ? JSON.parse(sessionStorage.getItem("USER_INFO")).roles[0]
//   : "";
// const username = sessionStorage["USER_INFO"]
//   ? JSON.parse(sessionStorage.getItem("USER_INFO")).user.username
//   : "";

// const loginState = useSelector((res) => res.loginState);
// const {
//   user: { username },
//   roles,
// } = loginState;
// console.log(username, "user role", roles[0]);
const fetchAllCourses = async () => {
  return await axios.get(SERVICE_URLS.FETCH_COURSES, { headers: authHeader() });
};

const fetchAllUsers = async () => {
  return await axios.get(SERVICE_URLS.FETCH_USERS, { headers: authHeader() });
};

const createLearningPath = async ({ path }) => {
  return await axios.post(
    SERVICE_URLS.CREATE_LEARNING_PATH,
    { path },
    { headers: authHeader() }
  );
};

const createAssignLearningPath = async ({ path }) => {
  return await axios.put(SERVICE_URLS.CREATE_ASSIGNED_PATH, path, {
    headers: authHeader(),
  });
};

export function* learningPathSaga() {
  yield takeLatest(actionTypes.FETCH_COURSES_REQUEST, fetchCourses);
  yield takeLatest(actionTypes.FETCH_USERS_REQUEST, fetchUsers);
  yield takeLatest(
    actionTypes.CREATE_LEARNING_PATH_CALL_REQUEST,
    createLearning
  );
  yield takeLatest(
    actionTypes.CREATE_ASSIGNED_LEARNING_PATH_CALL_REQUEST,
    createAssignLearning
  );
  yield takeLatest(
    actionTypes.GET_ASSIGNED_LEARNING_PATH_REQUEST,
    getAssignedLearningPaths
  );
  yield takeLatest(actionTypes.GET_MY_LEARNING_PATH_REQUEST, getMyLearningPath);
  yield takeLatest(actionTypes.DELETE_ALL_PATH, deleteAllPaths);
  yield takeLatest(actionTypes.DELETE_PATH, deletePaths);
  yield takeLatest(actionTypes.GET_LEARNING_PATH_REQUEST, getLearningPath); //get the list of all learning path created
  yield takeLatest(
    actionTypes.GET_LEARNING_PATH_COURSES_REQUEST,
    getLearningPathCourses
  );
  yield takeLatest(actionTypes.GET_PENDING_APPROVAL, getPendingForApproval);
  yield takeLatest(actionTypes.GET_APPROVAL_REJECTION, getApprovalRejects);

  yield takeLatest(actionTypes.SAVE_COURSE_RATE, saveCourseRate);
  yield takeLatest(actionTypes.VIEW_ATTACHMENT, getAttachment);
  yield takeLatest(actionTypes.UPLOAD_CERTIFICATE, uploadCertificates);
  yield takeLatest(actionTypes.SEND_APPROVAL, sendForApproval);

  yield takeLatest(
    actionTypes.MANAGER_DASHBOARD_STATS_REQUEST,
    getManagerStats
  );
  yield takeLatest(actionTypes.ADMIN_DASHBOARD_STATS_REQUEST, getAdminStats);
  yield takeLatest(actionTypes.ADMIN_DASHBOARD_GRAPH_REQUEST, getAdminGraphs);
  yield takeLatest(
    actionTypes.ADMIN_LEARNING_PATH_DETAILS_REQUEST,
    getAdminLearningPathDetails
  );
  yield takeLatest(actionTypes.ADMIN_DETAILS_REQUEST, getAdminDetails);
  yield takeLatest(actionTypes.POPULAR_STUFF_REQUEST, getManagerPopularStuff);
}

function* fetchCourses() {
  try {
    const response = yield call(fetchAllCourses);
    const { data } = response;

    yield put({ type: actionTypes.FETCH_COURSES_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: actionTypes.FETCH_COURSES_FAILURE, error });
  }
}

function* fetchUsers() {
  try {
    const response = yield call(fetchAllUsers);
    const { data } = response;

    yield put({ type: actionTypes.FETCH_USERS_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: actionTypes.FETCH_USERS_FAILURE, error });
  }
}

function* createLearning(action) {
  try {
    const response = yield call(createLearningPath, action.payload);
    const { data } = response;
    yield put({
      type: actionTypes.CREATE_LEARNING_PATH_CALL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const { response } = error;
    const { data } = response;
    yield put({
      type: actionTypes.CREATE_LEARNING_PATH_CALL_FAILURE,
      payload: data,
    });
  }
}

function* createAssignLearning(action) {
  try {
    const response = yield call(createAssignLearningPath, action.payload);
    const { data } = response;
    yield put({
      type: actionTypes.CREATE_ASSIGNED_LEARNING_PATH_SUCCESS,
      payload: response,
    });
  } catch (error) {
    const { response } = error;
    const { data } = response;
    yield put({
      type: actionTypes.CREATE_ASSIGNED_LEARNING_PATH_FAILURE,
      payload: data,
    });
  }
}

const fetchPath = async ({ managerEmail }) => {
  return await axios.post(
    SERVICE_URLS.ASSIGNED_PATH,
    { managerEmail },
    { headers: authHeader() }
  );
};

function* getAssignedLearningPaths(action) {
  try {
    const response = yield call(fetchPath, action.payload);
    const { data } = response;
    yield put({
      type: actionTypes.GET_ASSIGNED_LEARNING_PATH_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: actionTypes.GET_ASSIGNED_LEARNING_PATH_FAILURE,
      payload: error,
    });
  }
}
//api call  to the list of all learning path courses assinged to particular users
const fetchMyPath = async ({ employeeEmail }) => {
  return await axios.post(
    SERVICE_URLS.MY_PATH,
    { employeeEmail },
    { headers: authHeader() }
  );
};

//api call to fetch all learning paths
const fetchLearningPath = async ({ assigneeId }) => {
  return await axios.get(SERVICE_URLS.GET_LEARNING_PATH + "/" + assigneeId, {
    headers: authHeader(),
  });
};
//function to get the list of all learning path courses assinged to particular users

function* getMyLearningPath(action) {
  try {
    const response = yield call(fetchMyPath, action.payload);
    const { data } = response;
    yield put({
      type: actionTypes.GET_MY_LEARNING_PATH_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: actionTypes.GET_MY_LEARNING_PATH_FAILURE,
      payload: error,
    });
  }
}

//function to get the list of all created learning path
function* getLearningPath(action) {
  try {
    const response = yield call(fetchLearningPath, action.payload);
    const { data } = response;
    yield put({ type: actionTypes.GET_LEARNING_PATH_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: actionTypes.GET_LEARNING_PATH_FAILURE, payload: error });
  }
}
const deleteAllPath = async ({ ids }) => {
  return await axios.post(
    SERVICE_URLS.DELETE_ALL_PATH,
    { ids },
    { headers: authHeader() }
  );
};

function* deleteAllPaths(action) {
  try {
    const response = yield call(deleteAllPath, action.payload);
    const { data } = response;
    yield put({ type: actionTypes.DELETE_ALL_PATH_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: actionTypes.DELETE_ALL_PATH_FAILURE, payload: error });
  }
}

const deletePath = async ({ ids }) => {
  return await axios.post(
    SERVICE_URLS.DELETE_ALL_PATH,
    { ids },
    { headers: authHeader() }
  );
};

function* deletePaths(action) {
  try {
    const response = yield call(deleteAllPath, action.payload);
    const { data } = response;
    yield put({ type: actionTypes.DELETE_PATH_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: actionTypes.DELETE_PATH_FAILURE, payload: error });
  }
}

const fetchPathCourses = async ({ ids, empid, learningPathEmployeeId }) => {
  let URL = SERVICE_URLS.LEARNINGPATH_COURSES + ids + "/" + empid;
  URL +=
    learningPathEmployeeId !== undefined
      ? "?lpeid=" + learningPathEmployeeId
      : "";
  return await axios.get(URL, { headers: authHeader() });
};

function* getLearningPathCourses(action) {
  try {
    const response = yield call(fetchPathCourses, action.payload);
    const { data } = response;
    yield put({
      type: actionTypes.GET_LEARNING_PATH_COURSES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: actionTypes.GET_LEARNING_PATH_COURSES_FAILURE,
      payload: error,
    });
  }
}
const getPFApproval = async ({ managerEmail }) => {
  return await axios.post(
    SERVICE_URLS.PENDING_FOR_APPROVAL,
    { managerEmail },
    { headers: authHeader() }
  );
};

function* getPendingForApproval(action) {
  try {
    const response = yield call(getPFApproval, action.payload);
    const { data } = response;

    yield put({
      type: actionTypes.FETCH_PENDING_FOR_APPROVAL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({ type: actionTypes.FETCH_PENDING_FOR_APPROVAL_FAILURE, error });
  }
}

const getApprovalReject = async (reqBody) => {
  return await axios.put(SERVICE_URLS.APPROVAL_REJEACT, reqBody, {
    headers: authHeader(),
  });
};

function* getApprovalRejects(action) {
  try {
    const response = yield call(getApprovalReject, action.payload);
    const { data } = response;
    yield put({
      type: actionTypes.FETCH_APPROVAL_SUCCESS,
      payload: action.payload,
    }); //data });
  } catch (error) {
    yield put({ type: actionTypes.FETCH_APPROVAL_FAILURE, error });
  }
}

const saveCourseRateRequest = async ({ reqBody }) => {
  return await axios.post(
    SERVICE_URLS.SAVE_COURSE_RATE,
    { ...reqBody },
    { headers: authHeader() }
  );
};

function* saveCourseRate(action) {
  try {
    const response = yield call(saveCourseRateRequest, action.payload);
    const { data } = response;

    yield put({ type: actionTypes.SAVE_COURSE_RATE_SUCCESS, payload: data });
    yield takeLatest(
      actionTypes.GET_MY_LEARNING_PATH_REQUEST,
      getMyLearningPath
    );
  } catch (error) {
    yield put({ type: actionTypes.SAVE_COURSE_RATE_FAILURE, error });
  }
}

const getAttachmentRequest = async (reqBody) => {
  return await axios.get(
    SERVICE_URLS.GET_ATTACHMENT + "/" + reqBody.lpId + "/" + reqBody.employeeId,
    { headers: authHeader() }
  );
};

function* getAttachment(action) {
  try {
    const response = yield call(getAttachmentRequest, action.payload);
    const { data } = response;

    yield put({ type: actionTypes.VIEW_ATTACHMENT_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: actionTypes.VIEW_ATTACHMENT_FAILURE, error });
  }
}

const uploadCertificatesRequest = async ({ reqBody }) => {
  return await axios.post(SERVICE_URLS.UPLOAD_CERTIFICATES, reqBody, {
    headers: authHeader(),
  });
};

function* uploadCertificates(action) {
  try {
    const response = yield call(uploadCertificatesRequest, action.payload);
    const { data } = response;

    yield put({ type: actionTypes.UPLOAD_CERTIFICATE_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: actionTypes.UPLOAD_CERTIFICATE_FAILURE, error });
  }
}

const sendForApprovalRequest = async (reqBody) => {
  return await axios.post(SERVICE_URLS.SEND_APPROVAL, reqBody, {
    headers: authHeader(),
  });
};

function* sendForApproval(action) {
  try {
    const response = yield call(sendForApprovalRequest, action.payload);
    const { data } = response;

    yield put({ type: actionTypes.SEND_APPROVAL_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: actionTypes.SEND_APPROVAL_FAILURE, error });
  }
}

const fetchManagerStats = async (role, payload) => {
  debugger;
  return await axios.post(
    role.roleName == "ROLE_EMPLOYEE"
      ? SERVICE_URLS.FETCH_EMPLOYEE_STATS
      : SERVICE_URLS.FETCH_MANAGER_STATS,
    role.roleName == "ROLE_EMPLOYEE"
      ? { employeeEmail: payload.managerEmail }
      : payload,
    {
      headers: authHeader(),
    }
  );
};

const fetchAdminStats = async () => {
  return await axios.get(SERVICE_URLS.FETCH_ADMIN_STATS, {
    headers: authHeader(),
  });
};

const fetchAdminGraph = async () => {
  return await axios.get(SERVICE_URLS.FETCH_ADMIN_GRAPHS, {
    headers: authHeader(),
  });
};

const fetchAdminLearningPathDetails = async () => {
  return await axios.get(SERVICE_URLS.FETCH_ADMIN_LEARNING_PATH_DETAILS, {
    headers: authHeader(),
  });
};

const fetchAdminDetails = async (id) => {
  return await axios.get(
    SERVICE_URLS.FETCH_ADMIN_DETAILS + `?learningPathId=` + id.empId,
    { headers: authHeader() }
  );
};

function* getManagerStats(action) {
  try {
    const response = yield call(fetchManagerStats, action.role, action.payload);
    const { data } = response;

    yield put({
      type: actionTypes.MANAGER_DASHBOARD_STATS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({ type: actionTypes.MANAGER_DASHBOARD_STATS_FAILURE, error });
  }
}

function* getAdminStats(action) {
  try {
    const response = yield call(fetchAdminStats, action.payload);
    const { data } = response;
    yield put({
      type: actionTypes.ADMIN_DASHBOARD_STATS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({ type: actionTypes.ADMIN_DASHBOARD_STATS_FAILURE, error });
  }
}

function* getAdminGraphs(action) {
  try {
    const response = yield call(fetchAdminGraph, action.payload);
    const { data } = response;
    yield put({
      type: actionTypes.ADMIN_DASHBOARD_GRAPH_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({ type: actionTypes.ADMIN_DASHBOARD_GRAPH_FAILURE, error });
  }
}

function* getAdminLearningPathDetails(action) {
  try {
    const response = yield call(fetchAdminLearningPathDetails, action.payload);
    const { data } = response;
    yield put({
      type: actionTypes.ADMIN_LEARNING_PATH_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({ type: actionTypes.ADMIN_LEARNING_PATH_DETAILS_FAILURE, error });
  }
}

function* getAdminDetails(action) {
  try {
    const response = yield call(fetchAdminDetails, action.payload);
    const { data } = response;
    yield put({ type: actionTypes.ADMIN_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: actionTypes.ADMIN_DETAILS_FAILURE, error });
  }
}

const fetchManagerPopularStuff = async (payload) => {
  return await axios.get(
    `${SERVICE_URLS.FETCH_MANAGER_POPULAR_STUFF}/${payload.assigneeId}`,
    { headers: authHeader() }
  );
};

function* getManagerPopularStuff(action) {
  try {
    const response = yield call(fetchManagerPopularStuff, action.payload);
    const { data } = response;

    yield put({ type: actionTypes.POPULAR_STUFF_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: actionTypes.POPULAR_STUFF_FAILURE, error });
  }
}
