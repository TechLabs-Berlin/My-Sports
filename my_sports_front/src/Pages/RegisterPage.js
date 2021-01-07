import React from 'react';
import axios from 'axios'; //maybe implement
import { connect } from "react-redux";
import { signup } from "../actions/session";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as moment from 'moment';


const mapStateToProps = ({ errors }) => ({
    errors
});

const mapDispatchToProps = dispatch => ({
    signup: user => dispatch(signup(user))
});

const setSelectedDate = date => {
    const valueOfInput = date;
    console.log(valueOfInput);
    startDate = moment(date);

};

var startDate = moment().subtract(18, 'years')._d;


const RegisterPage = ({ errors, signup }) => {
    const usernameRef = React.createRef();
    const emailRef = React.createRef();
    const passwordRef = React.createRef();
    const nameRef = React.createRef();
    const dobRef = React.createRef();
    const genderRef = React.createRef();
    const locationRef = React.createRef();
    const lastNameRef = React.createRef();


    const registerUser = (e) => {
        e.preventDefault();
        const user = {
            username: usernameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            name: nameRef.current.value,
            dob: dobRef.current.value,
            gender: genderRef.current.value,
            location: locationRef.current.value,
            lastName: lastNameRef.current.value
        }
        signup(user);
    }

    return (
        <div>
            <h1>MY SPORTS</h1>
            <h4>Register</h4>
            <form onSubmit={registerUser}>
                <div>
                    <label htmlFor="username">Username (only letters and number inputs accepted):</label>
                    <input type="text" id="username" name="username" placeholder="username" pattern="[A-Za-z0-9]+" ref={usernameRef} required />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="email" ref={emailRef} required />
                </div>
                <div>
                    <label htmlFor="password">Password (8 characters minimum, 12 characters maximum. Must contain atleast 1 letter and 1 number):</label>
                    <input type="password" id="password" name="password" placeholder="password" minLength="8" pattern="(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,12}" ref={passwordRef} required />
                </div>
                <div>
                    <label htmlFor="name">First Name:</label>
                    <input type="text" id="name" name="name" placeholder="name" pattern="[A-Za-z]+" ref={nameRef} required />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name:</label>
                    <input type="text" id="lastName" name="lastName" placeholder="lastName" pattern="[A-Za-z]+" ref={lastNameRef} required />
                </div>
                <div>
                    <label htmlFor="dob">Date Of Birth:</label>
                    <DatePicker
                        selectedDate={startDate}
                        onChange={date => setSelectedDate(date)}
                        dateFormat='dd/MM/yyyy'
                        maxDate={moment().subtract(18, 'years')._d}
                        showYearDropdown
                        scrollableYearDropdown
                        yearDropdownItemNumber={100}
                    />


                </div>
                <div>
                    <label htmlFor="gender">Gender:</label>
                    <select id="gender" name="gender" ref={genderRef} required>
                        <option value="">--Please choose an option--</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="N/A">Prefer Not To Say</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="location">Location:</label>
                    <select id="location" name="location" ref={locationRef} required>
                        <option value="">--Please choose an option--</option>
                        <option value="berlin">Berlin</option>
                    </select>
                </div>
                <button>Register Now</button>
            </form>
        </div>
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegisterPage);