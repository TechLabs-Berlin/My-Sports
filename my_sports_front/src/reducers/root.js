import { combineReducers } from 'redux';
import errors from './errors/errors';
import session from './session/session';
import event from './event/event';
import filters from './event/filter';
import socket from './socket/socket';
import message from './messages/message';
import resetPassword from './resetPassword/resetPassword';
import success from './success/success';

export default combineReducers({
  session,
  errors,
  success,
  event,
  filters,
  socket, //might not need
  message,
  resetPassword
});