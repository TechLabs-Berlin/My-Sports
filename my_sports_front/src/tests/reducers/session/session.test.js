import {
  RECEIVE_CURRENT_USER,
  LOGOUT_CURRENT_USER,
} from "../../../actions/session";
import SessionReducer from "../../../reducers/session/session";

const nullSession = {
  userId: null,
  username: null,
  name: null,
  email: null,
};

test("should set session default state", () => {
  const state = SessionReducer(undefined, { type: "@@INIT" });
  expect(state).toEqual(nullSession);
});

test("should set receive user", () => {
  const user = {
    userId: 123,
    username: "test user",
    name: "user",
    email: "user@test.com",
  };
  const action = { type: RECEIVE_CURRENT_USER, user };
  const state = SessionReducer(undefined, action);
  expect(state).toEqual(user);
});

test("should log out user", () => {
  const user = {
    userId: 123,
    username: "test user",
    name: "user",
    email: "user@test.com",
  };
  const state = SessionReducer(user, { type: LOGOUT_CURRENT_USER });
  expect(state).toEqual(nullSession);
});
