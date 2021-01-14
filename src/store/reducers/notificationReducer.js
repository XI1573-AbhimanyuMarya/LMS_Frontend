import { actionTypes } from '../types';

const initialState = {
  notificationList: [],
  count:0
}

export const notificationReducer = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case actionTypes.FETCH_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        notificationList: payload,
      };
    case actionTypes.FETCH_NOTIFICATIONS_FAILURE:
      return {
        ...state,
        notificationList: payload,
      };
      case actionTypes.FETCH_NOTIFICATIONCOUNT_SUCCESS:
        return {
          ...state,
          count: payload,
        };
      case actionTypes.FETCH_NOTIFICATIONCOUNT_FAILURE:
        return {
          ...state,
          count: payload,
        };
      case actionTypes.ERASE_COUNT_SUCCESS:
      return {
        ...state,
        count: payload,
      }; 
        
    default: return state;
  }
}
