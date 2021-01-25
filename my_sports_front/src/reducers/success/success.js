import { CLEAR_SUCCESS, RECEIVE_SUCCESS } from "../../actions/success";

export default (state = "", action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_SUCCESS:
      return action.payload;
    case CLEAR_SUCCESS:
      return "";
    default:
      return state;
  }
};