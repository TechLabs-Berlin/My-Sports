import * as apiUtil from "../util/session";
import { receiveErrors } from "./error";

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER";

export const receiveCurrentUser = (user) => ({
  type: RECEIVE_CURRENT_USER,
  user,
});

export const logoutCurrentUser = () => ({
  type: LOGOUT_CURRENT_USER,
});

export const login = (user) => async (dispatch) => {
  const response = await apiUtil.login(user);
  if (response) {
    return dispatch(receiveCurrentUser(response.data));
  } else {
    const errorMessage = "Wrong username or password";
    return dispatch(receiveErrors(errorMessage));
  }
};

export const signup = (user) => async (dispatch) => {
  const response = await apiUtil.signup(user);
  if (response.response) {
    return dispatch(receiveErrors(response.response.data.message));
  } else {
    return dispatch(receiveCurrentUser(response.data));
  }
};

export const logout = () => async (dispatch) => {
  const response = await apiUtil.logout();
  if (response) {
    return dispatch(logoutCurrentUser());
  }
};
