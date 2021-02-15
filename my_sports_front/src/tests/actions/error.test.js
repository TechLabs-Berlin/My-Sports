import {
  receiveErrors,
  clearErrors,
  receiveErrorsFunc,
} from "../../actions/error";

test("should clear error", () => {
  const action = clearErrors();
  expect(action).toEqual({
    type: "CLEAR_ERRORS",
  });
});

test("should receive error", () => {
  const action = receiveErrors({});
  expect(action).toEqual({
    type: "RECEIVE_ERRORS",
    payload: {},
  });
});

//receiveErrorsFunc
