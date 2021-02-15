import {
  CLEAR_MESSAGES,
  FETCH_MESSAGES,
  SAVE_MESSAGE,
} from "../../../actions/message";
import MessageReducer from "../../../reducers/messages/message";

test("should return default state", () => {
  const state = MessageReducer(undefined, { type: "@@INIT" });
  expect(state).toEqual([]);
});

test("should update state if receiving type", () => {
  const payload = "Message";
  const state = MessageReducer(undefined, {
    type: SAVE_MESSAGE,
    payload,
  });
  expect(state).toEqual([payload]);
});

test("should update state if receiving type when populated", () => {
  const payload = "Message";
  const currentState = ["test"];
  const state = MessageReducer(currentState, {
    type: SAVE_MESSAGE,
    payload,
  });
  expect(state).toEqual(["test", payload]);
});

test("should clear state if receiving type", () => {
  const currentState = ["test"];
  const state = MessageReducer(currentState, {
    type: CLEAR_MESSAGES,
  });
  expect(state).toEqual([]);
});

test("should update state if receiving type when populated", () => {
  const payload = ["Message", "Message1"];
  const currentState = ["test", "test1"];
  const state = MessageReducer(currentState, {
    type: FETCH_MESSAGES,
    payload,
  });
  expect(state).toEqual(["test", "test1", "Message", "Message1"]);
});
