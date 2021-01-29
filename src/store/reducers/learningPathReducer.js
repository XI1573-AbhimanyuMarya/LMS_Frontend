import { actionTypes } from "../types";

const initialState = {
  learningPathName: "",
  learningPathDes: "",
  learningPathLevel: 101,
  courses: [],
  courseIdArr: [],
  users: [],
  userIdArr: [],
  learningPathDuration: 3,
  isLoading: false,
  pathModelOpen: false,
  discardModelOpen: false,
  firstNextClicked: false,
  activePathStep: "",
  errorMessage: "",
  mycourses: [],
  assignedCources: [],
  uploadFilePopup: false,
  learningPathIds: 3,
  learningPathCourses: [],
  uploadFilePopup: false,
  uploadFilePopup: false,
  rejectPopup: false,
  approvePopup: false,
  pfApproval: [],
  ApprovedRejected: "",
  allLearningPath: [],
  attachments: [],
  certificates: [],
  selectedLp: {},
  Approval: {},
  dashStats: {},
  dashGraphAdmin: {},
  managerPopularStuff: [],
};

export const learningPathReducer = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case actionTypes.LOGOUT:
      return {
        ...initialState,
      };
    case actionTypes.FETCH_COURSES_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.FETCH_COURSES_SUCCESS:
      return {
        ...state,
        courses: payload,
        isLoading: false,
      };
    case actionTypes.FETCH_COURSES_FAILURE:
      return {
        ...state,
        courses: payload,
        isLoading: false,
      };
    case actionTypes.GET_FILTERED_COURSES:
      return {
        ...state,
        filteredCoursesList: payload.list,
        isLoading: false,
      };
    case actionTypes.GET_SELECTED_COURSES:
      return {
        ...state,
        courses: payload.list,
        courseIdArr: payload.courseIdArr,
        isLoading: false,
      };
    case actionTypes.FETCH_USERS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: payload,
        isLoading: false,
      };
    case actionTypes.FETCH_USERS_FAILURE:
      return {
        ...state,
        users: payload,
        isLoading: false,
      };
    case actionTypes.GET_FILTERED_USERS:
      return {
        ...state,
        filteredUsersList: payload.list,
        isLoading: false,
      };
    case actionTypes.GET_SELECTED_USERS:
      return {
        ...state,
        users: payload.list,
        userIdArr: payload.userIdArr,
        isLoading: false,
      };
    case actionTypes.GET_SLIDER_DURATION:
      return {
        ...state,
        learningPathDuration: payload.val,
        isLoading: false,
      };
    case actionTypes.GET_LEARNING_PATH_NAME:
      return {
        ...state,
        learningPathName: payload.pathName,
        isLoading: false,
      };
    case actionTypes.GET_LEARNING_PATH_DES:
      return {
        ...state,
        learningPathDes: payload.pathDes,
        isLoading: false,
      };
    case actionTypes.GET_LEARNING_PATH_LEVEL:
      return {
        ...state,
        learningPathLevel: payload.pathLevel,
        isLoading: false,
      };
    case actionTypes.SHOW_BUTTON_BASED_ON_RATE:
      return {
        ...state,
        learningPathCourses: state.learningPathCourses.map((elm) => {
          if (elm.id == payload.course.id) {

            elm.showBtn = "Save";
            if (payload.percentCompleted == 100) {
              elm.showBtn = "Upload";
            }
            // if (payload.course.percentCompleted == 100) {
            //   debugger;
            //   elm.showBtn = "Upload";
            // } else if (payload.course.percentCompleted < 100) {
            // }
          } else {
            elm.showBtn = "";
          }
          return elm;
        }),
        isLoading: false,
      };

    case actionTypes.CHANGE_DOC_UPLOAD_STATUS_FOR_COURSE:
      return {
        ...state,
        learningPathCourses: state.learningPathCourses.map((elm) => {
          if (elm.id == payload.courseId) {
            elm.documentsUploaded = true;
          }
          return elm;
        }),
        isLoading: false,
      };

    case actionTypes.CHANGE_COURSE_RATE:
      let learningPathCourses1 = state.learningPathCourses.map((elm) => {
        if (elm.id == payload.course.id) {
          elm.percentCompleted = payload.changeRate;
        }
        return elm;
      });
      return {
        ...state,
        learningPathCourses: learningPathCourses1,
        isLoading: false,
      };
    case actionTypes.PATH_MODEL_OPEN:
      if (payload.val === true) {
        return {
          ...state,
          pathModelOpen: payload.val,
          isLoading: false,
        };
      } else {
        delete state.filteredCoursesList;
        delete state.filteredUsersList;
        return {
          ...state,
          pathModelOpen: payload.val,
          learningPathName: "",
          courses: [],
          users: [],
          courseIdArr: [],
          userIdArr: [],
          isLoading: false,
          activePathStep: "",
          firstNextClicked: false,
        };
      }
    case actionTypes.CLEAR_CREATE_LP_FORM:
      delete state.filteredUsersList;
      return {
        ...state,
        learningPathDes: "",
        learningPathName: "",
        learningPathDuration: 3,
        learningPathLevel: 101,
        courseIdArr: [],
        userIdArr: [],
        users: state.users.map((user) => {
          user.selected = false;
          return user;
        }),
      };
    case actionTypes.DISCARD_MODEL_OPEN:
      return {
        ...state,
        discardModelOpen: payload.val,
        isLoading: false,
      };
    case actionTypes.OPEN_DETAIL_EMP:
      return {
        ...state,
        openDetailOfEnp: { empStatus: payload.val, empID: payload.id },
        isLoading: false,
      };
    case actionTypes.SET_DELETED_EMP:
      return {
        ...state,
        deletedEmpData: payload.val,
        isLoading: false,
      };

    case actionTypes.UPLOADFILE_MODEL_OPEN:
      return {
        ...state,
        uploadFilePopup: payload.val,
        isLoading: false,
      };
    case actionTypes.REJECT:
      return {
        ...state,
        rejectPopup: payload.val,
        isLoading: false,
      };
    case actionTypes.APPROVE:
      return {
        ...state,
        approvePopup: payload.val,
        isLoading: false,
      };
    case actionTypes.CREATE_LEARNING_PATH_CALL_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.CREATE_ASSIGNED_LEARNING_PATH_CALL_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case actionTypes.CREATE_LEARNING_PATH_CALL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        message: payload.message,
        status: payload.status,
        learningPathDes: "",
        learningPathName: "",
        learningPathDuration: 3,
        learningPathLevel: 101,
        courseIdArr: [],
        userIdArr: [],
      };

    case actionTypes.CREATE_ASSIGNED_LEARNING_PATH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        message: payload.data,
        status: payload.status,
        userIdArr: [],
      };

    case actionTypes.CREATE_ASSIGNED_LEARNING_PATH_FAILURE:
      return {
        ...state,
        isLoading: false,
        message: payload.message,
        status: payload.status,
      };
    case actionTypes.CREATE_LEARNING_PATH_CALL_FAILURE:
      return {
        ...state,
        isLoading: false,
        message: payload.message,
        status: payload.status,
      };
    case actionTypes.GET_FIRST_NEXT_CLICKED:
      return {
        ...state,
        firstNextClicked: payload.val,
      };
    case actionTypes.GET_ACTIVE_PATH_STEP:
      return {
        ...state,
        activePathStep: payload.step,
      };

    case actionTypes.GET_ASSIGNED_LEARNING_PATH_REQUEST:
      return {
        ...state,
        isLoading: true,
        errorMessage: "",
      };
    case actionTypes.GET_ASSIGNED_LEARNING_PATH_SUCCESS:
      return {
        ...state,
        assignedCources: payload,
        isLoading: false,
        errorMessage: "",
      };
    case actionTypes.GET_ASSIGNED_LEARNING_PATH_FAILURE:
      return {
        ...state,
        assignedCources: [],
        isLoading: false,
        errorMessage: payload.error,
      };

    case actionTypes.GET_MY_LEARNING_PATH_REQUEST:
      return {
        ...state,
        isLoading: true,
        errorMessage: "",
      };

    case actionTypes.GET_LEARNING_PATH_REQUEST:
      return {
        ...state,
        isLoading: true,
        errorMessage: "",
      };
    case actionTypes.GET_LEARNING_PATH_SUCCESS:
      return {
        ...state,
        isLoading: true,
        errorMessage: "",
        allLearningPath: payload,
      };
    case actionTypes.GET_LEARNING_PATH_FAILURE:
      return {
        ...state,
        isLoading: true,
        errorMessage: "",
        allLearningPath: payload.error,
      };
    case actionTypes.GET_MY_LEARNING_PATH_SUCCESS:
      return {
        ...state,
        mycourses: payload,
        isLoading: false,
        errorMessage: "",
      };
    case actionTypes.GET_MY_LEARNING_PATH_FAILURE:
      return {
        ...state,
        mycourses: [],
        isLoading: false,
        errorMessage: payload.error,
      };
    case actionTypes.DELETE_ALL_PATH:
      return {
        ...state,
        isLoading: true,
        errorMessage: "",
      };
    case actionTypes.DELETE_ALL_PATH_SUCCESS:
      return {
        ...state,
        deleteStatus: payload,
        isLoading: false,
        errorMessage: "",
      };
    case actionTypes.DELETE_ALL_PATH_FAILURE:
      return {
        ...state,
        deleteStatus: "",
        isLoading: false,
        errorMessage: payload.error,
      };
    case actionTypes.DELETE_PATH:
      return {
        ...state,
        isLoading: true,
        errorMessage: "",
      };
    case actionTypes.DELETE_PATH_SUCCESS:
      return {
        ...state,
        deleteStatus: payload,
        isLoading: false,
        errorMessage: "",
      };
    case actionTypes.DELETE_PATH_FAILURE:
      return {
        ...state,
        deleteStatus: "",
        isLoading: false,
        errorMessage: payload.error,
      };
    case actionTypes.GET_LEARNING_PATH_COURSES_REQUEST:
      return {
        ...state,
        isLoading: true,
        errorMessage: "",
      };
    case actionTypes.GET_LEARNING_PATH_COURSES_SUCCESS:
      // payload.map((course)=>{
      //   course.percentageCompleted=10;
      //   return course;
      // });
      return {
        ...state,
        learningPathCourses: payload,
        isLoading: false,
        errorMessage: "",
      };
    case actionTypes.GET_LEARNING_PATH_COURSES_FAILURE:
      return {
        ...state,
        learningPathCourses: [],
        isLoading: false,
        errorMessage: payload.error,
      };

    case actionTypes.GET_PENDING_APPROVAL:
      return {
        ...state,
        isLoading: true,
        errorMessage: "",
      };

    case actionTypes.FETCH_PENDING_FOR_APPROVAL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        pfApproval: payload,
      };
    case actionTypes.FETCH_PENDING_FOR_APPROVAL_FAILURE:
      return {
        ...state,
        isLoading: false,
        pfApproval: [],
      };
    case actionTypes.FETCH_APPROVAL_REJECT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ApprovedRejected: payload,
      };
    case actionTypes.FETCH_APPROVAL_REJECT_FAILURE:
      return {
        ...state,
        isLoading: false,
        ApprovedRejected: [],
      };
    case actionTypes.GET_APPROVAL_REJECTION:
      return {
        ...state,
        isLoading: true,
        errorMessage: "",
      };
    case actionTypes.FETCH_APPROVAL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        errorMessage: "",
        pfApproval: state.pfApproval.filter((item) => {
          return (
            item.learningPathEmployeesId !== payload.learningPathEmployeeId
          );
        }),
      };
    case actionTypes.FETCH_APPROVAL_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessage: "",
      };
    case actionTypes.SAVE_COURSE_RATE:
      return {
        ...state,
        isLoading: true,
        errorMessage: "",
      };

    case actionTypes.SAVE_COURSE_RATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case actionTypes.SAVE_COURSE_RATE_FAILURE:
      return {
        ...state,
        isLoading: false,
      };

    case actionTypes.VIEW_ATTACHMENT:
      return {
        ...state,
        isLoading: true,
        errorMessage: "",
      };

    case actionTypes.VIEW_ATTACHMENT_SUCCESS:
      let data = [];
      payload.forEach((item) => {
        data.push({ src: "data:image/png;base64," + item });
      });
      return {
        ...state,
        isLoading: false,
        attachments: data,
      };
    case actionTypes.VIEW_ATTACHMENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        attachments: [],
      };
    case actionTypes.ADD_CERTIFICATE:
      return {
        ...state,
        certificates: payload,
        errorMessage: "",
      };
    case actionTypes.UPLOAD_CERTIFICATE:
      return {
        ...state,
        isLoading: true,
        errorMessage: "",
      };
    case actionTypes.UPLOAD_CERTIFICATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        certificates: [],
        errorMessage: "",
      };
    case actionTypes.UPLOAD_CERTIFICATE_FAILURE:
      return {
        ...state,
        isLoading: false,
        certificates: [],
        errorMessage: payload,
      };

    case actionTypes.SELECTED_LEARNING_PATH:
      return {
        ...state,
        isLoading: false,
        selectedLp: payload,
      };

    case actionTypes.SEND_APPROVAL:
      return {
        ...state,
        isLoading: true,
        errorMessage: "",
      };
    case actionTypes.SEND_APPROVAL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        errorMessage: "",
      };
    case actionTypes.SEND_APPROVAL_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessage: payload,
      };
    case actionTypes.MANAGER_DASHBOARD_STATS_REQUEST:
      return {
        ...state,
        isLoading: true,
        errorMessage: "",
      };
    case actionTypes.ADMIN_DASHBOARD_STATS_REQUEST:
      return {
        ...state,
        isLoading: true,
        errorMessage: "",
      };
    case actionTypes.ADMIN_DASHBOARD_STATS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        dashStats: payload,
        errorMessage: "",
      };
    case actionTypes.ADMIN_DASHBOARD_STATS_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessage: payload,
      };

    case actionTypes.ADMIN_DETAILS_REQUEST:
      return {
        ...state,
        isLoading: true,
        errorMessage: "",
      };
    case actionTypes.ADMIN_LEARNING_PATH_DETAILS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        adminLearningPathDetails: payload,
        errorMessage: "",
      };
    case actionTypes.ADMIN_LEARNING_PATH_DETAILS_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessage: "",
      };

    case actionTypes.ADMIN_DETAILS_REQUEST:
      return {
        ...state,
        isLoading: true,
        errorMessage: "",
      };
    case actionTypes.ADMIN_DETAILS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        adminDetails: payload,
        errorMessage: "",
      };
    case actionTypes.ADMIN_DETAILS_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessage: "",
      };

    case actionTypes.ADMIN_LEARNING_PATH_MANAGE_REQUEST:
      return {
        ...state,
        isLoading: true,
        errorMessage: "",
      };
    case actionTypes.ADMIN_LEARNING_PATH_MANAGE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        adminLearningPathManageDetails: payload,
        errorMessage: "",
      };
    case actionTypes.ADMIN_LEARNING_PATH_MANAGE_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessage: "",
      };

    case actionTypes.DELETE_ADMIN_LEARNING_PATH_CARD_REQUEST:
      return {
        ...state,
        isLoading: true,
        errorMessage: "",
      };
    case actionTypes.DELETE_ADMIN_LEARNING_PATH_CARD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        deleteAdminPathCards: payload,
        errorMessage: "",
      };
    case actionTypes.DELETE_ADMIN_LEARNING_PATH_CARD_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessage: "",
      };

    case actionTypes.MANAGER_DASHBOARD_STATS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        dashStats: payload,
        errorMessage: "",
      };
    case actionTypes.MANAGER_DASHBOARD_STATS_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessage: payload,
      };
    case actionTypes.POPULAR_STUFF_REQUEST:
      return {
        ...state,
        isLoading: true,
        errorMessage: "",
      };
    case actionTypes.POPULAR_STUFF_SUCCESS:
      return {
        ...state,
        isLoading: false,
        managerPopularStuff: payload,
        errorMessage: "",
      };
    case actionTypes.POPULAR_STUFF_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessage: payload,
      };

    case actionTypes.ADMIN_DASHBOARD_GRAPH_REQUEST:
      return {
        ...state,
        isLoading: true,
        errorMessage: "",
      };
    case actionTypes.ADMIN_DASHBOARD_GRAPH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        dashGraphAdmin: payload,
        errorMessage: "",
      };
    case actionTypes.ADMIN_DASHBOARD_GRAPH_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessage: payload,
      };
    default:
      return state;
  }
};
