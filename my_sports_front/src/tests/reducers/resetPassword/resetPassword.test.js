import {
  GET_USERNAME,
  TOGGLE_CODE_OK,
  UPDATE_SUCCESS_TOGGLE,
} from "../../../actions/resetPassword";
import ResetPasswordReducer from "../../../reducers/resetPassword/resetPassword";

const initialState = {
  passwordToggle: false,
  username: "",
  updated: false,
};

test("should set password reset default state", () => {
  const state = ResetPasswordReducer(undefined, { type: "@@INIT" });
  expect(state).toEqual(initialState);
});

test("should set password reset get username", () => {
  const payload = "test username";
  const action = { type: GET_USERNAME, payload };
  const state = ResetPasswordReducer(initialState, action);
  expect(state.username).toBe(payload);
});

test("should set password reset toggle code ok 1", async () => {
  const action = { type: TOGGLE_CODE_OK };
  const state = ResetPasswordReducer(initialState, action);
  expect(state.passwordToggle).toBeTruthy();
});

test("should set password reset toggle code ok", () => {
  let currentState = {
    passwordToggle: true,
    username: "",
    updated: false,
  };
  const state = ResetPasswordReducer(currentState, { type: TOGGLE_CODE_OK });
  expect(state.passwordToggle).toBe(false);
});

test("should set password update toggle successs", async () => {
  const action = { type: UPDATE_SUCCESS_TOGGLE };
  const state = ResetPasswordReducer(initialState, action);
  expect(state.updated).toBeTruthy();
});

test("should set password reset toggle code ok", () => {
  let currentState = {
    passwordToggle: false,
    username: "",
    updated: true,
  };
  const state = ResetPasswordReducer(currentState, {
    type: UPDATE_SUCCESS_TOGGLE,
  });
  expect(state.updated).toBe(false);
});
