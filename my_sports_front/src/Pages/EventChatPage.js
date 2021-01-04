import React, { useEffect } from 'react';
import { connect, useSelector } from "react-redux";
import io from 'socket.io-client';
import { toggleSocket } from '../actions/socket';
import { getMessagesFunc, saveMessage, clearMessages } from '../actions/message';

const mapStateToProps = ({ event, session, message }) => ({
  event,
  session,
  message
});  

const mapDispatchToProps = dispatch => ({
  toggleSocket: () => dispatch(toggleSocket()),
  getMessagesFunc: (id) => dispatch(getMessagesFunc(id)),
  saveMessage: (payload) => dispatch(saveMessage(payload)),
  clearMessages: () => dispatch(clearMessages())
})

const EventChatPage = ({ session, match, message, toggleSocket, getMessagesFunc, saveMessage, clearMessages }) => {

  const { id } = match.params
  const event = useSelector(state =>
    state.event.find(event => event._id === id)
  )

  const socket = io('http://localhost:5000');

  useEffect(() => {
    toggleSocket();
    getMessagesFunc(id);
    socket.emit('joinRoom', id)
    socket.on('displayMessage', (msg) => {
      console.log(msg);
      saveMessage(msg);
    })
    return () => {
      socket.emit('leaveRoom', id)
      socket.disconnect();
      toggleSocket();
      clearMessages();
    }
  }, [])

    if (!event) {
        return (
        <div>
            <h2>Event not found!</h2>
        </div>
        )
    }

    let isMember = false;
    const memberCheck = event.teammates.filter((teammate) => {
      const memberMatch = teammate._id.includes(session.userId)
      return memberMatch
    })

    if (memberCheck.length === 1) {
      isMember = true
    }

    if (!isMember) {
        return (
        <div>
            <h2>You are not currently signed up for this event</h2>
        </div>
        )
    }

    // socket.on('connect', () => {
    //   console.log('User connected from front end')
    // })

    socket.on('disconnect', () => {
      console.log('User disconnected from front end')
    });

    const emit = (e) => {
      e.preventDefault();
      const messageData = {
        event: event._id,
        user: session.userId,
        message: e.target.chatMessage.value
      }
      socket.emit('message', messageData);
      e.target.chatMessage.value = '';
    }

    return (
        <div>
            <p>Chat to your teammates</p>
            <section>
                <ul id="messages">
                  {message && message.map((m) => {
                    return <li><b>{m.user.username}:</b>{m.message}</li>
                  })}
                </ul>
                <form className="test-form" id="chat-form" onSubmit={emit}>
                <input className="test-form-input" name="chatMessage" id="msg" autoComplete="off" /><button className="test-form-button">Send</button>
                </form>
            </section>
        </div>
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(EventChatPage);
