export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

export const receiveErrors = (payload) => ({
  type: RECEIVE_ERRORS,
  payload
});

export const clearErrors = () => ({
  type: CLEAR_ERRORS
});

export const receiveErrorsFunc = payload => dispatch => {
  return dispatch(receiveErrors(payload))
}