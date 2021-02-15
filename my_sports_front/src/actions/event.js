import * as apiUtil from "../util/event";

export const CREATE_EVENT = "CREATE_EVENT";
export const DELETE_EVENT = "DELETE_EVENT";
export const FETCH_ALL = "FETCH_ALL";

export const createEvent = (payload) => ({
  type: CREATE_EVENT,
  payload,
});

export const deleteEvent = (event) => ({
  //need to implment properly
  type: DELETE_EVENT,
  event,
});

export const getAllEvents = (response) => ({
  type: FETCH_ALL,
  payload: response,
});

export const getEvents = () => async (dispatch) => {
  const response = await apiUtil.getAllEvents();
  return dispatch(getAllEvents(response));
};
