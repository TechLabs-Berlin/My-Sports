import { CLEAR_ERRORS, RECEIVE_ERRORS } from "../../actions/error";

export default (state = "", action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ERRORS:
      return action.payload;
    case CLEAR_ERRORS:
      return "";
    default:
      return state;
  }
};