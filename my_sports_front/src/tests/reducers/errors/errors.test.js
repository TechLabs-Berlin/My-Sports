import { CLEAR_ERRORS, RECEIVE_ERRORS } from "../../../actions/error";
import ErrorsReducer from "../../../reducers/errors/errors";

test("should return default state", () => {
  const state = ErrorsReducer(undefined, { type: "@@INIT" });
  expect(state).toEqual("");
});

test("should return new state if receiving type", () => {
  const errors = [{ title: "test" }];
  const state = ErrorsReducer(undefined, {
    type: RECEIVE_ERRORS,
    payload: errors,
  });
  expect(state).toEqual(errors);
});

test("should clear state if receiving type", () => {
  const errors = [{ title: "test" }];
  const state = ErrorsReducer(errors, {
    type: CLEAR_ERRORS,
    payload: {},
  });
  expect(state).toEqual("");
});
