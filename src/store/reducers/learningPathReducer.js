import { actionTypes } from '../types';

const initialState = {
  learningPathName: '',
  learningPathDes: '',
  learningPathLevel:101,
  courses: [],
  courseIdArr: [],
  users: [],
  userIdArr: [],
  learningPathDuration: 3,
  isLoading: false,
  pathModelOpen: false,
  discardModelOpen: false,
  firstNextClicked: false,
  activePathStep: '',
  errorMessage: '',
  mycourses: [],
  assignedCources: [],
  learningPathCourses:[],
  uploadFilePopup:false,
  uploadFilePopup:false,
  rejectPopup:false,
  approvePopup:false,
  pfApproval:[],
  ApprovedRejected:'',
  attachments:[],
  certificates:[]
}

export const learningPathReducer = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case actionTypes.FETCH_COURSES_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case actionTypes.FETCH_COURSES_SUCCESS:
      return {
        ...state,
        courses: payload,
        isLoading: false
      };
    case actionTypes.FETCH_COURSES_FAILURE:
      return {
        ...state,
        courses: payload,
        isLoading: false
      };
    case actionTypes.GET_FILTERED_COURSES:
      return {
        ...state,
        filteredCoursesList: payload.list,
        isLoading: false
      };
    case actionTypes.GET_SELECTED_COURSES:
      return {
        ...state,
        courses: payload.list,
        courseIdArr: payload.courseIdArr,
        isLoading: false
      };
    case actionTypes.FETCH_USERS_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case actionTypes.FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: payload,
        isLoading: false
      };
    case actionTypes.FETCH_USERS_FAILURE:
      return {
        ...state,
        users: payload,
        isLoading: false
      };
    case actionTypes.GET_FILTERED_USERS:
      return {
        ...state,
        filteredUsersList: payload.list,
        isLoading: false
      };
    case actionTypes.GET_SELECTED_USERS:
      return {
        ...state,
        users: payload.list,
        userIdArr: payload.userIdArr,
        isLoading: false
      };
    case actionTypes.GET_SLIDER_DURATION:
      return {
        ...state,
        learningPathDuration: payload.val,
        isLoading: false
      }
    case actionTypes.GET_LEARNING_PATH_NAME:
      return {
        ...state,
        learningPathName: payload.pathName,
        isLoading: false
      }
      case actionTypes.GET_LEARNING_PATH_DES:
        return {
          ...state,
          learningPathDes: payload.pathDes,
          isLoading: false
        }
    case actionTypes.GET_LEARNING_PATH_LEVEL:
      return {
        ...state,
        learningPathLevel: payload.pathLevel,
        isLoading: false
      }
    case actionTypes.SHOW_BUTTON_BASED_ON_RATE:
      let showBtn;
      if(payload.course.percentCompleted==100){
        showBtn="Upload";
      }else if(payload.course.percentCompleted<100){
        showBtn="Save";
      }
      let learningPathCourses=state.learningPathCourses.map((elm)=>{
        if(elm.id==payload.course.id){
          elm.showBtn=showBtn;
        }else{
          elm.showBtn='';
        }
        return elm;
      });
      return {
        ...state,
        learningPathCourses: learningPathCourses,
        isLoading: false
      }
    case actionTypes.CHANGE_COURSE_RATE:
      let learningPathCourses1=state.learningPathCourses.map((elm)=>{
        if(elm.id==payload.course.id){
          elm.percentCompleted=payload.changeRate;
        }
        return elm;
      });
      return {
        ...state,
        learningPathCourses: learningPathCourses1,
        isLoading: false
      }
    case actionTypes.PATH_MODEL_OPEN:
      if (payload.val === true) {
        return {
          ...state,
          pathModelOpen: payload.val,
          isLoading: false
        }
      } else {
        delete state.filteredCoursesList;
        delete state.filteredUsersList;
        return {
          ...state,
          pathModelOpen: payload.val,
          learningPathName: '',
          courses: [],
          users: [],
          courseIdArr: [],
          userIdArr: [],
          isLoading: false,
          activePathStep: '',
          firstNextClicked: false
        }
      }
    case actionTypes.DISCARD_MODEL_OPEN:
      return {
        ...state,
        discardModelOpen: payload.val,
        isLoading: false
      }

      case actionTypes.UPLOADFILE_MODEL_OPEN:
        return {
          ...state,
          uploadFilePopup: payload.val,
          isLoading: false
        }
        case actionTypes.REJECT:
        return {
          ...state,
          rejectPopup: payload.val,
          isLoading: false
        }
        case actionTypes.APPROVE:
        return {
          ...state,
          approvePopup: payload.val,
          isLoading: false
        }
    case actionTypes.CREATE_LEARNING_PATH_CALL_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case actionTypes.CREATE_LEARNING_PATH_CALL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        message: payload.message,
        status: payload.status
      }
    case actionTypes.CREATE_LEARNING_PATH_CALL_FAILURE:
      return {
        ...state,
        isLoading: false,
        message: payload.message,
        status: payload.status
      }
    case actionTypes.GET_FIRST_NEXT_CLICKED:
      return {
        ...state,
        firstNextClicked: payload.val,
      }
    case actionTypes.GET_ACTIVE_PATH_STEP:
      return {
        ...state,
        activePathStep: payload.step,
      }

    case actionTypes.GET_ASSIGNED_LEARNING_PATH_REQUEST:
      return {
        ...state,
        isLoading: true,
        errorMessage: ''
      };
    case actionTypes.GET_ASSIGNED_LEARNING_PATH_SUCCESS:
      return {
        ...state,
        assignedCources: payload,
        isLoading: false,
        errorMessage: ''
      };
    case actionTypes.GET_ASSIGNED_LEARNING_PATH_FAILURE:
      return {
        ...state,
        assignedCources: [],
        isLoading: false,
        errorMessage: payload.error
      };

    case actionTypes.GET_MY_LEARNING_PATH_REQUEST:
      return {
        ...state,
        isLoading: true,
        errorMessage: ''
      };
    case actionTypes.GET_MY_LEARNING_PATH_SUCCESS:
      return {
        ...state,
        mycourses: payload,
        isLoading: false,
        errorMessage: ''
      };
    case actionTypes.GET_MY_LEARNING_PATH_FAILURE:
      return {
        ...state,
        mycourses: [],
        isLoading: false,
        errorMessage: payload.error
      };
    case actionTypes.DELETE_ALL_PATH:
      return {
        ...state,
        isLoading: true,
        errorMessage: ''
      };
    case actionTypes.DELETE_ALL_PATH_SUCCESS:
      return {
        ...state,
        deleteStatus: payload,
        isLoading: false,
        errorMessage: ''
      };
    case actionTypes.DELETE_ALL_PATH_FAILURE:
      return {
        ...state,
        deleteStatus: '',
        isLoading: false,
        errorMessage: payload.error
      };
    case actionTypes.DELETE_PATH:
      return {
        ...state,
        isLoading: true,
        errorMessage: ''
      };
    case actionTypes.DELETE_PATH_SUCCESS:
      return {
        ...state,
        deleteStatus: payload,
        isLoading: false,
        errorMessage: ''
      };
    case actionTypes.DELETE_PATH_FAILURE:
      return {
        ...state,
        deleteStatus: '',
        isLoading: false,
        errorMessage: payload.error
      };
    case actionTypes.GET_LEARNING_PATH_COURSES_REQUEST:
      return {
        ...state,
        isLoading: true,
        errorMessage: ''
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
        errorMessage: ''
      };
    case actionTypes.GET_LEARNING_PATH_COURSES_FAILURE:
      return {
        ...state,
        learningPathCourses: [],
        isLoading: false,
        errorMessage: payload.error
      };

      case actionTypes.GET_PENDING_APPROVAL:
        return {
          ...state,
          isLoading: true,
          errorMessage: ''
        };

      case actionTypes.FETCH_PENDING_FOR_APPROVAL_SUCCESS:
        return {
          ...state,
          isLoading: false,
          pfApproval: payload
        }
      case actionTypes.FETCH_PENDING_FOR_APPROVAL_FAILURE:
        return {
          ...state,
          isLoading: false,
          pfApproval: []
        }
        case actionTypes.FETCH_APPROVAL_REJECT_SUCCESS:
        return {
          ...state,
          isLoading: false,
          ApprovedRejected: payload
        }
      case actionTypes.FETCH_APPROVAL_REJECT_FAILURE:
        return {
          ...state,
          isLoading: false,
          ApprovedRejected: []
        }
        case actionTypes.GET_APPROVAL_REJECTION:
        return {
          ...state,
          isLoading: true,
          errorMessage: ''
        };
        case actionTypes.SAVE_COURSE_RATE:
          return {
            ...state,
            isLoading: true,
            errorMessage: ''
          };
  
        case actionTypes.SAVE_COURSE_RATE_SUCCESS:
          console.log(payload);
          return {
            ...state,
            isLoading: false
          }
        case actionTypes.SAVE_COURSE_RATE_FAILURE:
          console.log(payload);
          return {
            ...state,
            isLoading: false
          }

        case actionTypes.VIEW_ATTACHMENT:
          return {
            ...state,
            //isLoading: true,
            errorMessage: ''
          };
  
        case actionTypes.VIEW_ATTACHMENT_SUCCESS:
          let data=[];
          payload.forEach(item=>{
            data.push({src:"data:image/png;base64,"+item});
          });
          return {
            ...state,
            //isLoading: false,
            attachments:data
          }
        case actionTypes.VIEW_ATTACHMENT_FAILURE:
          return {
            ...state,
            //isLoading: false,
            attachments:[]
          }
      case actionTypes.ADD_CERTIFICATE:
        return {
          ...state,
          certificates:payload,
          errorMessage: ''
        };
      case actionTypes.UPLOAD_CERTIFICATE:
        return {
          ...state,
          isLoading: true,
          errorMessage: ''
        };
      case actionTypes.UPLOAD_CERTIFICATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        certificates:[],
        errorMessage: ''
      };
      case actionTypes.UPLOAD_CERTIFICATE_FAILURE:
      return {
        ...state,
        isLoading: false,
        certificates:[],
        errorMessage: payload
      };
    default: return state;
  }
}
