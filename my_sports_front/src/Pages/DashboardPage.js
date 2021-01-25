import React, { useEffect } from "react";
import { connect } from "react-redux";
import { logout } from "../actions/session";
import { getEvents } from '../actions/event';
import { resetFilters } from '../actions/filter';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { clearErrors } from "../actions/error";
import { clearSuccess } from "../actions/success";


const mapStateToProps = ({ session, event }) => ({
  session,
  event
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  getEvents: () => dispatch(getEvents()),
  resetFilters: () => dispatch(resetFilters()),
  clearErrors: () => dispatch(clearErrors()),
  clearSuccess: () => dispatch(clearSuccess())
});


const DashboardPage = ({ logout, session, event, getEvents, resetFilters, clearErrors, clearSuccess }) => {

  useEffect( async () => {
    getEvents();
    resetFilters();
    clearErrors();
    clearSuccess();
  }, [])

  return (
    <div>
        <h1>Hi {session.username} </h1>
        <p>Welcome to the My Sports Dashboard Page! What next? Complete your profile and then go ahead and find your team!</p>
        <p><Link to={"/profile/" + session.userId}>View Profile</Link></p>
        <p>View former Events here: * Short list of recent events *</p>
        <p>Your upcoming matches:</p>
          <ul>
            {event.filter(e => e.teammates.some(teammate => teammate._id === session.userId)).map((myEvents) => {
              return <li><Link to={"/event/" + myEvents._id}>{myEvents.title}</Link> on {moment(myEvents.date).format("dddd, MMMM Do")}</li> 
            })}
          </ul>
        <p><Link to="/find-event">Find Match</Link></p>
        <p><button onClick={logout}>Logout</button></p>
    </div>
  )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(DashboardPage);