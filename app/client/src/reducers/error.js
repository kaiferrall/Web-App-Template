import { ERROR, FORM_ERROR } from "../actions/types";

const initialState = {
  form: {},
  general: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FORM_ERROR:
      return {
        ...state,
        form: action.payload
      };
    default:
      return state;
  }
}
