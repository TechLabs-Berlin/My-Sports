import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { signup } from "../actions/session";
import Modal from "../components/TermsConditions";
import '../styles/common.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import ReactTooltip from 'react-tooltip';
import { receiveErrorsFunc, clearErrors } from '../actions/error';
import { receiveSuccessFunc } from '../actions/success';

const mapStateToProps = ({ errors }) => ({
    errors
});

const mapDispatchToProps = dispatch => ({
    signup: user => dispatch(signup(user)),
    receiveSuccessFunc: payload => dispatch(receiveSuccessFunc(payload)),
    clearErrors: () => dispatch(clearErrors()),
    receiveErrorsFunc: payload => dispatch(receiveErrorsFunc(payload))
});

const RegisterPage = ({ errors, signup, receiveSuccessFunc, clearErrors, receiveErrorsFunc }) => {

    useEffect(() => {
        return () => {
            clearErrors()
        }
    }, [])

    const [error, setError] = useState('');


    const registerUser = async(e) => {
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

    const showTerms = () => {
        setIsTermsVisible(true);
        const body = document.querySelector('.container-fluid');
        body.classList.add('modal-scroll-block');
    }

    const hideTerms = () => {
        setIsTermsVisible(false);
        const body = document.querySelector('.container-fluid');
        body.classList.remove('modal-scroll-block');
    }

    if (errors && errors === 'username taken') {
        const input = document.getElementById('username-div');
        input.classList.add('error-border')
    }

    if (errors && errors === 'email taken') {
        const input = document.getElementById('email-div');
        input.classList.add('error-border')
    }

    const showPassword = () => {
        const passwordField = document.getElementById('password');
        const type = passwordField.getAttribute('type') === 'password'? 'text': 'password';
        passwordField.setAttribute('type', type);
        const eye = document.getElementById('eye');
        let view = eye.innerHTML === 'visibility'? 'visibility_off': 'visibility';
        eye.innerHTML = view;
    }

    return (
        <div className="silver-background container-fluid">
            <div className="registration-top-space"></div>
            <div className="form-box-white container-fluid">
                <p className="registration-message">Sign up to find sport matches with people in your area.</p>
                <form onSubmit={registerUser}>
                    <div>
                        <div id="username-div">
                            <label htmlFor="username"><i className="material-icons md-24 grey-icon">account_circle</i></label>
                            <input type="text" id="username" name="username" placeholder="Username" pattern="[A-Za-z0-9]+" data-tip="Only letters and numbers may be used." required />
                            <ReactTooltip place="top" type="light" effect="solid" border={true} borderColor="black"/>
                        </div>
                        {errors && errors === 'username taken' && <p className="error-text">This username is already taken. Try another one.</p> }
                    </div>
                    <div>
                        <div id="email-div">
                            <label htmlFor="email" className="white-space">....</label>
                            <input type="email" id="email" name="email" placeholder="Email" required />
                        </div>
                        {errors && errors === 'email taken' && <p className="error-text">This email address is already registered. Try another one.</p> }
                    </div>
                    <div>
                        <label htmlFor="password"><i className="material-icons md-24 grey-icon">lock_outline</i></label>
                        <input type="password" id="password" name="password" placeholder="Password" minLength="8" pattern="(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,12}" data-tip="Passwords must be between 8 and 12 characters long. They must containt atleast 1 letter and 1 number." required />
                        <ReactTooltip place="top" type="light" effect="solid" border={true} borderColor="black"/>
                        <i id="eye" className="material-icons md-24 grey-icon" onClick={showPassword}>visibility</i>
                    </div>
                    <div>
                        <label htmlFor="name" className="white-space">....</label>
                        <input type="text" id="name" name="name" placeholder="First Name" pattern="[A-Za-z]+" required />
                    </div>
                    <div>
                        <label htmlFor="lastName" className="white-space">....</label>
                        <input type="text" id="lastName" name="lastName" placeholder="Last Name" pattern="[A-Za-z]+" required />
                    </div>
                    <div>
                        <label htmlFor="dob" className="white-space">......</label> 
                        <DatePicker
                            id="dob"
                            name="dob"
                            placeholderText="Date Of Birth"
                            selected={startDate}
                            onChange={date => setStartDate(date)}
                            startDate={moment().subtract(18, 'years')._d}
                            maxDate={moment().subtract(18, 'years')._d}
                            dateFormat="dd/MM/yyyy"
                            showYearDropdown
                            scrollableYearDropdown
                            showMonthDropdown
                            scrollableMonthDropdown
                            yearDropdownItemNumber={100}
                        />
                    </div>
                    <div>
                        <select id="gender" name="gender" className="reg-select" required>
                            <option value="">--Please choose a Gender--</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="N/A">Prefer Not To Say</option>
                        </select>
                    </div>
                    <div>
                        <select id="location" name="location" className="reg-select" required>
                            <option value="">--Please choose a Location--</option>
                            <option value="Charlottenburg">Charlottenburg</option>
                            <option value="Friedrichshain">Friedrichshain</option>
                            <option value="Kreuzberg">Kreuzberg</option>
                            <option value="Mitte">Mitte</option>
                            <option value="Moabit">Moabit</option>
                            <option value="Neukolln">Neukolln</option>
                            <option value="Prenzlauer Berg">PrenzLauer Berg</option>
                            <option value="Schoneberg">Schoneberg</option>
                            <option value="Tempelhof">Tempelhof</option>
                            <option value="Tiergarten">Tiergarten</option>
                            <option value="Wilmersdorf">Wilmersdorf</option>
                        </select>
                    </div>
                    <button className="send-registration-button">Sign Up</button>
                    <div className="Terms">
                        <p className="registration-message">By signing up, you agree to our <span onClick={showTerms} className="pointer"><strong>Terms, Data Policy</strong> and <strong>Cookies Policy.</strong></span></p>
                        {isTermsVisible ? (
                            <Modal onClose={hideTerms}>
                                <h2>Terms & Conditions</h2>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, dolores, quis similique obcaecati sequi id quo iste maxime velit consectetur praesentium consequatur labore doloribus voluptates animi laboriosam facilis. Quaerat, ipsum.
                                    Quisquam incidunt blanditiis, excepturi ullam architecto beatae consectetur rem nisi consequatur laboriosam, facilis temporibus fugit sunt veritatis alias voluptatibus! Corrupti aliquid a doloremque dolore, sunt sit ipsum laudantium nobis. Neque.
                                    Nihil quo ex, expedita at deleniti necessitatibus earum eos rerum? Vel deserunt accusamus veniam dolorum, minus nulla esse illum similique eius ab modi! Placeat voluptas nam debitis consequuntur, voluptate eum.
                                    Error cumque eveniet sequi quibusdam inventore eum minus quis, asperiores alias, reiciendis hic aliquid amet impedit adipisci similique soluta ex obcaecati ea ullam maxime vero beatae iure? Mollitia, tempore. Nihil.
                                    In reprehenderit fuga qui doloribus voluptate. Ratione, autem. Sit sunt libero beatae voluptates eligendi accusantium magni delectus officiis molestias facere voluptatum, nisi excepturi voluptatibus neque velit adipisci cumque in totam.
                                    Repudiandae nemo quaerat praesentium maxime dolorum enim asperiores similique earum illum ab, tempora vero, ad, rerum in porro quae eum corrupti sed alias temporibus perferendis commodi aperiam consequatur! Consectetur, cupiditate!
                                    Recusandae autem obcaecati quisquam officiis maxime dolorum voluptas molestias. Velit, ipsum inventore? Totam facilis, hic tempore commodi ea natus fuga incidunt odio doloribus quos facere illo. Quis, doloremque! Ipsa, inventore!
                                    Dolorem deleniti itaque odio, repudiandae ducimus provident quod voluptas voluptatibus vel sit perferendis fugit labore. Consectetur minus ut quidem, incidunt fugiat quibusdam recusandae animi neque ipsam culpa odio, eius optio?
                                    Nisi tenetur id fugiat sapiente suscipit impedit, beatae dolore natus saepe quidem accusantium ab fuga libero velit facere sint? Nesciunt earum maiores molestiae illo harum. Ab mollitia id placeat nostrum.
                                    Aliquid quod debitis qui earum pariatur commodi ea, veniam molestias, veritatis explicabo eveniet, alias nemo itaque assumenda dolorum eum magni vero quam minus dicta. Non magnam minus natus possimus nihil.</p>
                            </Modal>
                        ) : null}
                    </div>
                </form>
            </div>
            <div className="row justify-content-center">
                <p className="col"><Link className="back-to-login-button" to="/login">Back to login</Link></p>
            </div>
        </div>
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegisterPage);