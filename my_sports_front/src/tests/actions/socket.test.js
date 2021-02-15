import { toggleSocket, TOGGLE_SOCKET } from "../../actions/socket";

test("should set up toggle socket ", () => {
  const action = toggleSocket();
  expect(action).toEqual({ type: TOGGLE_SOCKET });
});
