export const RECEIVE_SUCCESS = 'RECEIVE_SUCCESS';
export const CLEAR_SUCCESS = 'CLEAR_SUCCESS';

export const receiveSuccess = (payload) => ({
  type: RECEIVE_SUCCESS,
  payload
});

export const clearSuccess = () => ({
  type: CLEAR_SUCCESS
});

export const receiveSuccessFunc = payload => dispatch => {
  return dispatch(receiveSuccess(payload))
}
