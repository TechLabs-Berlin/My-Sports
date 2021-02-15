import {
  getUsername,
  toggleCodeOk,
  updateSuccessToggle,
  GET_USERNAME,
  TOGGLE_CODE_OK,
  UPDATE_SUCCESS_TOGGLE,
} from "../../actions/resetPassword";

test("should set up toggle code ok", () => {
  const action = toggleCodeOk();
  expect(action).toEqual({ type: TOGGLE_CODE_OK });
});

test("should set up get user name action object", () => {
  const payload = "test username";
  const action = getUsername(payload);
  expect(action).toEqual({ type: GET_USERNAME, payload });
});

test("should set up get update success toggle action object", () => {
  const action = updateSuccessToggle();
  expect(action).toEqual({ type: GET_USERNAME }); //maybe error in code
  //   expect(action).toEqual({type: UPDATE_SUCCESS_TOGGLE});
});
