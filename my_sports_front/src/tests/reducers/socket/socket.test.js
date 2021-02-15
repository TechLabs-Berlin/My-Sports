import { TOGGLE_SOCKET } from "../../../actions/socket";
import SocketReducer from "../../../reducers/socket/socket";

const initialState = {
  toggle: false,
};

test("should set toggle socket default state", () => {
  const state = SocketReducer(undefined, { type: "@@INIT" });
  expect(state).toEqual(initialState);
});

test("should set toggle socket from default", () => {
  const state = SocketReducer(undefined, { type: TOGGLE_SOCKET });
  expect(state.toggle).toBe(true);
});

test("should switch toggle socket from prev state", () => {
  const currentState = {
    toggle: true,
  };
  const state = SocketReducer(currentState, { type: TOGGLE_SOCKET });
  expect(state.toggle).toBeFalsy();
});
