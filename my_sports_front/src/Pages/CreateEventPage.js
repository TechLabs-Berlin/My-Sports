import React, { useState } from 'react';
import { connect } from "react-redux";
import { createEvent } from '../actions/event';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import "../../node_modules/react-datepicker/dist/react-datepicker.css";

const mapStateToProps = ({ session }) => ({
    session
});

const mapDispatchToProps = dispatch => ({
    createEvent: payload => dispatch(createEvent(payload))
});

const CreateEventPage = ({ session, createEvent, history }) => {
    const submitEvent = async (e) => {
        e.preventDefault();
        const event = {
            title: e.target.title.value,
            sport: e.target.sport.value,
            size: e.target.size.value,
            date: moment.parseZone(e.target.date.value),
            time: e.target.time.value,
            location: e.target.location.value,
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
    const [startDate, setStartDate] = useState(new Date());
    return (
        <div>
            <p>Create an event here:</p>
            <form onSubmit={submitEvent}>
                <div>
                    <label htmlFor="title">Event Title:</label>
                    <input id="title" name="title" type="text" required />
                </div>
                <div>
                    <label htmlFor="sport">Sport:</label>
                    <select id="sport" name="sport" required>
                        <option value="">Please select one</option>
                        <option value="basketball">Basketball</option>
                        <option value="bouldering">Bouldering</option>
                        <option value="football">Football</option>
                        <option value="pingpong">Ping Pong</option>
                        <option value="running">Running</option>
                        <option value="volleyball">Volleyball</option>
                        <option value="yoga">Yoga</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="size">Maximum Number of Athelets:</label>
                    <input id="size" name="size" type="number" min="2" max="20" step="1" required />
                </div>
                <div>
                    <label htmlFor="date">Date:</label>
                    <DatePicker
                        id="date"
                        name="date"
                        utcOffset={0}
                        placeholderText="Select a date"
                        selected={startDate}
                        minDate={startDate}
                        onChange={date => setStartDate(date)}
                        dateFormat="MMMM d, yyyy"
                        shouldCloseOnSelect={true}
                    />
                </div>
                <div>
                    <label htmlFor="time">Event Time:</label>
                    <select id="time" name="time" required>
                        <option value="">Please select one</option>
                        <option value="morning">Morning</option>
                        <option value="afternoon">Afternoon</option>
                        <option value="evening">Evening</option>
                        <option value="night">Night</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="location">Event Location:</label>
                    <select id="location" name="location" required>
                        <option value="">Please select one</option>
                        <option value="friedrichshain">Friedrichshain</option>
                        <option value="neukolln">Neukolln</option>
                        <option value="kreuzburg">Kreuzburg</option>
                        <option value="prenzlaur burg">Prenzlaur Burg</option>
                    </select>
                </div>
                <button>Create Event</button>
            </form>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateEventPage);