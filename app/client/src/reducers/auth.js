import {
  SET_USER_AUTH_STATUS,
  LOADING_TRUE,
  LOADING_FALSE
} from "../actions/types";

const initialState = {
  authenticated: false,
  user: null,
  loading: true
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_USER_AUTH_STATUS:
      return {
        user: action.payload.user,
        authenticated: action.payload.authenticated
      };
    case LOADING_TRUE:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
