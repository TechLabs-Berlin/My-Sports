import { createEvent, deleteEvent, getAllEvents } from "../../actions/event";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

test("should setup create event object", () => {
  const action = createEvent({ eventName: "football nights" });
  expect(action).toEqual({
    type: "CREATE_EVENT",
    payload: { eventName: "football nights" },
  });
});

test("should setup get all events object", () => {
  const response = {};
  const action = getAllEvents(response);
  expect(action).toEqual({
    type: "FETCH_ALL",
    payload: response,
  });
});

test("should setup delete event action object", () => {
  const event = { eventName: "test event" };
  const action = deleteEvent(event);
  expect(action).toEqual({
    type: "DELETE_EVENT",
    event,
  });
});

//getEvents
