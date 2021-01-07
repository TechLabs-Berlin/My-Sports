import React, { useState } from 'react';
import { connect } from "react-redux";
import { createEvent } from '../actions/event';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const mapStateToProps = ({ session }) => ({
    session
});

const mapDispatchToProps = dispatch => ({
    createEvent: payload => dispatch(createEvent(payload))
});

const CreateEventPage = ({ session, createEvent, history }) => {
    const titleRef = React.createRef();
    const sportRef = React.createRef();
    const sizeRef = React.createRef();
    const dateRef = React.createRef();
    const timeRef = React.createRef();
    const locationRef = React.createRef();

    const startDate = new Date();

    const submitEvent = async (e) => {
        e.preventDefault();
        const event = {
            title: titleRef.current.value,
            sport: sportRef.current.value,
            size: sizeRef.current.value,
            date: dateRef.current.value,
            time: timeRef.current.value,
            location: locationRef.current.value,
            host: session.userId
        }
        const response = await fetch('api/event', {
            method: 'POST',
            body: JSON.stringify(event),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json();
        if (response.ok) {
            createEvent(data)
            history.push('/dashboard')
        }
    }

    // add min date as today with JS
    return (
        <div>
            <p>Create an event here:</p>
            <form>
                <div>
                    <label htmlFor="title">Event Title:</label>
                    <input id="title" name="title" type="text" required ref={titleRef} />
                </div>
                <div>
                    <label htmlFor="sport">Sport:</label>
                    <select id="sport" name="sport" required ref={sportRef}>
                        <option value="">Please select one</option>
                        <option value="basketball">Basketball</option>
                        <option value="beach volleyball">Beach Volleyball</option>
                        <option value="football">Football</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="size">Maximum Number of Athelets:</label>
                    <input id="size" name="size" type="number" min="2" max="20" step="1" required ref={sizeRef} />
                </div>
                <div>
                    <label htmlFor="date">Date:</label>
                    <DatePicker
                        selected={startDate}
                        minDate={startDate}
                        placeholderText="Select a date "
                    />

                </div>
                <div>
                    <label htmlFor="time">Event Time:</label>
                    <select id="time" name="time" required ref={timeRef}>
                        <option value="">Please select one</option>
                        <option value="morning">Morning</option>
                        <option value="afternoon">Afternoon</option>
                        <option value="evening">Evening</option>
                        <option value="night">Night</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="location">Event Location:</label>
                    <select id="location" name="location" required ref={locationRef}>
                        <option value="">Please select one</option>
                        <option value="friedrichshain">Friedrichshain</option>
                        <option value="neukolln">Neukolln</option>
                        <option value="kreuzburg">Kreuzburg</option>
                        <option value="prenzlaur burg">Prenzlaur Burg</option>
                    </select>
                </div>
                <button onClick={submitEvent}>Create Event</button>
            </form>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateEventPage);