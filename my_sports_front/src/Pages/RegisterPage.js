import React, { useState } from 'react';
import axios from 'axios'; //maybe implement
import { connect } from "react-redux";
import { signup } from "../actions/session";
import Modal from "../components/TermsConditions";
import '../styles/common.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

const mapStateToProps = ({ errors }) => ({
    errors
});

const mapDispatchToProps = dispatch => ({
    signup: user => dispatch(signup(user))
});



const RegisterPage = ({ errors, signup }) => {
    const [error, setError] = useState('');

    const registerUser = (e) => {
        e.preventDefault();
        const user = {
            username: e.target.username.value,
            email: e.target.email.value,
            password: e.target.password.value,
            name: e.target.name.value,
            dob: moment.parseZone(e.target.dob.value),
            gender: e.target.gender.value,
            location: e.target.location.value,
            lastName: e.target.lastName.value
        }

        if(e.target.email.value !== e.target.email_confirm.value){
            setError(`email doesn't match`);
        } 

        else if(e.target.password.value !== e.target.password_confirm.value){
            setError(`password doesn't match`);
        } else {
            setError('');
            signup(user);
        }

    }

    const [startDate, setStartDate] = useState(null);

    const [isTermsVisible, setIsTermsVisible] = useState(false);


    return (
        <div>
            <h1>MY SPORTS</h1>
            <h4>Register</h4>
            <form onSubmit={registerUser}>
                <div>
                    <label htmlFor="username">Username (only letters and number inputs accepted):</label>
                    <input type="text" id="username" name="username" placeholder="username" pattern="[A-Za-z0-9]+" required />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="email" required />
                </div>
                <div>
                <label htmlFor="confirm_email">Confirm Email:</label>
                <input type="email" id="email_confirm" name="email_confirm" placeholder="confirm email" required />
                </div>
                <div>
                    <label htmlFor="password">Password (8 characters minimum, 12 characters maximum. Must contain atleast 1 letter and 1 number):</label>
                    <input type="password" id="password" name="password" placeholder="password" minLength="8" pattern="(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,12}" required />
                </div>
                <div>
                <label htmlFor="password_confirmation">Confirm Password:</label>
                <input type="password" id="password_confirm" name="password_confirm" placeholder="confirm password" required />
                </div>
                <div>
                    <label htmlFor="name">First Name:</label>
                    <input type="text" id="name" name="name" placeholder="name" pattern="[A-Za-z]+" required />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name:</label>
                    <input type="text" id="lastName" name="lastName" placeholder="lastName" pattern="[A-Za-z]+" required />
                </div>
                <div>
                    <label htmlFor="dob">Date Of Birth:</label>
                    <DatePicker
                        id="dob"
                        name="dob"
                        placeholderText="Select a date "
                        selected={startDate}
                        onChange={date => setStartDate(date)}
                        startDate={moment().subtract(18, 'years')._d}
                        maxDate={moment().subtract(18, 'years')._d}
                        showYearDropdown
                        scrollableYearDropdown
                        showMonthDropdown
                        scrollableMonthDropdown
                        yearDropdownItemNumber={100}
                    />
                </div>
                <div>
                    <label htmlFor="gender">Gender:</label>
                    <select id="gender" name="gender" required>
                        <option value="">--Please choose an option--</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="N/A">Prefer Not To Say</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="location">Location:</label>
                    <select id="location" name="location" required>
                        <option value="">--Please choose an option--</option>
                        <option value="berlin">Berlin</option>
                    </select>
                </div>
                <div className="Terms">
                    <button onClick={() => setIsTermsVisible(true)}>Terms & Conditions</button>
                    {isTermsVisible ? (
                        <Modal onClose={() => setIsTermsVisible(false)}>
                            <h2>Terms & Conditions</h2>
                            <p>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                when an unknown printer took a galley of type and scrambled it to make a type
                                specimen book. It has survived not only five centuries, but also the leap into e
                                lectronic typesetting, remaining essentially unchanged. It was popularised in t
                                he 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                                and more recently with desktop publishing software like Aldus PageMaker including
                                versions of Lorem Ipsum.
                            </p>
                        </Modal>
                    ) : null}
                    <input type="checkbox" id="checkbox" required />
                </div>
                <button>Register Now</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegisterPage);