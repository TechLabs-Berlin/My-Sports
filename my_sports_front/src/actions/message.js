import * as apiUtil from "../util/message";

export const FETCH_MESSAGES = "FETCH_MESSAGES";
export const SAVE_MESSAGE = "SAVE_MESSAGE";
export const CLEAR_MESSAGES = "CLEAR_MESSAGES";

export const fetchMessages = (payload) => ({
  type: FETCH_MESSAGES,
  payload,
});

export const saveMessage = (payload) => ({
  type: SAVE_MESSAGE,
  payload,
});

export const clearMessages = () => ({
  type: CLEAR_MESSAGES,
});

export const getMessagesFunc = (id) => async (dispatch) => {
  const response = await apiUtil.getAllMessages(id);
  return dispatch(fetchMessages(response));
};
