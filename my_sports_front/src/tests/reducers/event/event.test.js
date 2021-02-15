import { CREATE_EVENT, DELETE_EVENT, FETCH_ALL } from "../../../actions/event";
import EventReducer from "../../../reducers/event/event";

const events = [
  { title: "test", location: "Mitte" },
  { title: "test1", location: "Fhain" },
];

test("should return default state", () => {
  const state = EventReducer(undefined, {});
  expect(state).toEqual([]);
});

test("should return new state if receiving type", () => {
  const state = EventReducer(undefined, {
    type: FETCH_ALL,
    payload: events,
  });
  expect(state).toEqual(events);
});

test("should return new state if receiving type", () => {
  const payload = { title: "test2", location: "Pankow" };
  const action = { type: CREATE_EVENT, payload };
  const state = EventReducer(events, action);
  expect(state).toEqual([
    { title: "test", location: "Mitte" },
    { title: "test1", location: "Fhain" },
    { title: "test2", location: "Pankow" },
  ]);
});

test("should delete event if receiving type", () => {
  const payload = "Test";
  const currentState = ["Fhain", "Test", "Info"];
  const action = { type: DELETE_EVENT, payload };
  const state = EventReducer(currentState, action);
  expect(state).toEqual(["Fhain", "Info"]);
});
