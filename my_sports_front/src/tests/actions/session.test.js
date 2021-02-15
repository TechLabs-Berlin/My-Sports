import {
  logoutCurrentUser,
  receiveCurrentUser,
  RECEIVE_CURRENT_USER,
  LOGOUT_CURRENT_USER,
} from "../../actions/session";

test("should set up log out current user", () => {
  const action = logoutCurrentUser();
  expect(action).toEqual({ type: LOGOUT_CURRENT_USER });
});

test("should set up receive current user action object", () => {
  const user = {
    userId: 123,
    userName: "testuser1",
    name: "test user",
    email: "user@test.com",
  };
  const action = receiveCurrentUser(user);
  expect(action).toEqual({ type: RECEIVE_CURRENT_USER, user });
});

//login, signup and logout still to be done
