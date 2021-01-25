import React, { useEffect, useState } from 'react'
import { connect, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import moment from 'moment';
import Header from '../components/Header';
import StarRatings from 'react-star-ratings';
import { receiveSuccess } from '../actions/success';
import SuccessPage from '../components/SuccessPage';
import Modal from "../components/TermsConditions";
import EventChatPage from '../Pages/EventChatPage';

const mapStateToProps = ({ event, session, success }) => ({
    event,
    session,
    success
  });  

const mapDispatchToProps = dispatch => ({
  receiveSuccess: (payload) => dispatch(receiveSuccess(payload))
});


const EventPage = ({ session, match, history, success, receiveSuccess }) => {
  const { id } = match.params
  const event = useSelector(state =>
    state.event.find(event => event._id === id)
  )

const [eventSkillLevel, setEventSkillLevel] = useState(0)
let allRatings = []

  useEffect( async () => {
    const div = document.getElementById('border-bottom-color')
    div.classList.add(`bottom-border-color-${event.sport}`)
    for (let teammate of event.teammates) {
      switch (event.sport) {
        case 'volleyball':
          allRatings.push(teammate.volleyballRating)
          break;
        case 'basketball':
          allRatings.push(teammate.basketballRating)
          break;
        case 'football':
          allRatings.push(teammate.footballRating)
          break;
        case 'bouldering':
          allRatings.push(teammate.boulderingRating)
          break;
        case 'yoga':
          allRatings.push(teammate.yogaRating)
          break;
        case 'pingpong':
          allRatings.push(teammate.pingpongRating)
          break;
      }
    const average = allRatings.reduce((a, b) => a + b) / allRatings.length
    setEventSkillLevel(average)
    }
  }, [])

  const [isAreYouSureVisible, setIsAreYouSureVisible] = useState(false);

  const showAreYouSure = () => {
      setIsAreYouSureVisible(true);
  }

  const hideAreYouSure = () => {
      setIsAreYouSureVisible(false);
  }

  const myInfo = event.teammates.find(teammate => teammate._id === session.userId)

  if (!event) {
    return (
      <div>
        <h2>Event not found!</h2>
      </div>
    )
  }

  const joinEvent = async () => {
      const data = {
      teammateId: session.userId,
      eventId: event._id
      }
      const response = await fetch('/api/event/joinevent', {
          method: 'PUT',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          }
        })
      const info = await response.json();
      if (response.ok) {
          console.log(info)
      }
      receiveSuccess('You have succesfully joined the event.')
    }

  const leaveEvent = async () => {
    const data = {
    teammateId: session.userId,
    eventId: event._id
    }
    const response = await fetch('/api/event/leaveevent', {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
    const info = await response.json();
    if (response.ok) {
      receiveSuccess('You have succesfully left the event.')
    }
  }

  const deleteEvent = async () => {
    const data = {
      id: event._id
    }
    const response = await fetch('/api/event/', {
      method: 'DELETE',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const info = await response.json();
    if (response.ok) {
        console.log(info)
    }
    history.push('/dashboard');
  }

  const removePlayer = async (teammateId) => {
    const data = {
    teammateId,
    eventId: event._id
    }
    const response = await fetch('/api/event/removeplayer', {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
    const info = await response.json();
    if (response.ok) {
        console.log(info)
    }
    history.push('/dashboard')
  }
      

    let isMember = false;
    const memberCheck = event.teammates.filter((teammate) => {
      const memberMatch = teammate._id.includes(session.userId)
      return memberMatch
    })

    if (memberCheck.length === 1) {
      isMember = true
    }

    let isHost = false;
    if (event.host === session.userId) {
      isHost = true;
    }
    
    if (success) {
      return <SuccessPage success={success} />
    }

    return (
        <div>
          <Header title={'MYSPORTS'} />
          <div className="silver-background container-fluid">
            <div className="registration-top-space"></div>
            <div className="form-box-white thick-bottom-border">
              <div className="card" style={{width: 100 + '%'}}>
                <div className="card-body">
                  <h3 className="event-page-event-title card-title">{event.title}</h3>
                  <div id="border-bottom-color" className="row justify-content-space-between">
                    <div className="col">
                      <p className="card-text text-muted">{moment(event.date).format("dddd, MMM Do")}</p>
                      <p className="card-text text-muted">{event.location}</p>
                    </div>
                      <div className="col">
                        <img className="event-page-sport-image" src={`../images/sport-images/${event.sport}.png`} />
                      </div>
                  </div>
                    <p className="card-text text-muted player-count-text">Players: <span className="error-text">{event.teammates.length}/{event.size}</span></p>
                    <div className="row row-cols-5 justify-content-space-between">
                    {event.teammates && event.teammates.map((user, index) => {
                      return <div key={user._id} className={"col teammate-icon teammate-icon-color-" + index}><h6>{user.username[0].toUpperCase()}</h6></div>
                    })}
                    </div>
                    <div className="below-player-border"></div>
                    <p className="card-text text-muted player-skill-text">Average Player Skill Level:</p>
                    <StarRatings
                      rating={eventSkillLevel}
                      starRatedColor="#E9B467"
                      numberOfStars={5}
                      starDimension="1.2em"
                      starSpacing="0.7px"
                      />
                      {myInfo && ( <div> <p className="card-text text-muted player-skill-text">Your Skill Level:</p>
                      <StarRatings
                      rating={myInfo[`${event.sport}Rating`]}
                      starRatedColor="#E9B467"
                      numberOfStars={5}
                      starDimension="1.2em"
                      starSpacing="0.7px"
                      /> </div> ) }
                      <div className="below-player-border"></div>
                      <p className="card-text text-muted player-skill-text">{event.about || <span>This is a MySports {event.sport} event.</span>}</p>
                      <div className="accordion" id="accordionExample">
                        <div className="accordion-item">
                          <h2 className="accordion-header" id="headingOne">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            </button>
                          </h2>
                          <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                              {isMember && !isHost && <button className="leave-event-button" onClick={leaveEvent}>Leave Event ?</button>}
                              {isHost && <div><div><button className="edit-event-button"><Link className="edit-event-link" to={"/event/" + event._id + "/edit"}>Edit Event</Link></button></div><div><button className="delete-event-button" onClick={showAreYouSure}>Delete Event</button></div></div>}
                                {isAreYouSureVisible ? (
                                    <Modal onClose={hideAreYouSure}>
                                        <h3>Delete Event ?</h3>
                                        <p className="text-center">Are you sure you want to delete this event?</p>
                                        <button className="are-you-sure-button" onClick={deleteEvent}>Yes</button>
                                        <button className="are-you-not-sure-button" onClick={hideAreYouSure}>No</button>
                                    </Modal>
                                ) : null}
                              {!isMember && <button className="join-event-button" onClick={joinEvent}>Join Event !</button>}
                            </div>
                          </div>
                        </div>
                      </div>
                  </div>
                </div>
            </div>
            <div className="form-box-white">
            <EventChatPage id={id} event={event} />
            </div>
          </div>
        </div>
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(EventPage);
