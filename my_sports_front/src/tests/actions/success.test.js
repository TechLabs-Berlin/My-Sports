import {
  receiveSuccess,
  clearSuccess,
  CLEAR_SUCCESS,
  RECEIVE_SUCCESS,
} from "../../actions/success";

test("should set up clear success", () => {
  const action = clearSuccess();
  expect(action).toEqual({ type: CLEAR_SUCCESS });
});

test("should set up receive success action object", () => {
  const payload = "test success";
  const action = receiveSuccess();
  expect(action).toEqual({ type: RECEIVE_SUCCESS }, payload);
});
