import {
  clearMessages,
  fetchMessages,
  saveMessage,
  getMessagesFunc,
  CLEAR_MESSAGES,
  FETCH_MESSAGES,
  SAVE_MESSAGE,
} from "../../actions/message";

test("should set up clear messages", () => {
  const action = clearMessages();
  expect(action).toEqual({ type: CLEAR_MESSAGES });
});

test("should set up save message action object", () => {
  const payload = ["test message"];
  const action = saveMessage(payload);
  expect(action).toEqual({ type: SAVE_MESSAGE, payload });
});

test("should set up fetch message action object", () => {
  const payload = ["test message", "test message1"];
  const action = fetchMessages(payload);
  expect(action).toEqual({ type: FETCH_MESSAGES, payload });
});

//fetchMessagesFunc still to be done
