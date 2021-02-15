import { CLEAR_SUCCESS, RECEIVE_SUCCESS } from "../../../actions/success";
import SuccessReducer from "../../../reducers/success/success";

test("should set success reducer default state", () => {
  const state = SuccessReducer(undefined, { type: "@@INIT" });
  expect(state).toEqual("");
});

test("should set success reducer state to clear ", () => {
  const currentState = "succesfully active";
  const state = SuccessReducer(currentState, { type: CLEAR_SUCCESS });
  expect(state).toEqual("");
});

test("should set receive succes state", () => {
  const payload = "success";
  const action = { type: RECEIVE_SUCCESS, payload };
  const state = SuccessReducer(undefined, action);
  expect(state).toEqual(payload);
});
