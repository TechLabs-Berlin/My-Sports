import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { login } from "../actions/session";
import { Link } from 'react-router-dom';
import { clearErrors } from '../actions/error';
import { clearSuccess } from '../actions/success';

const mapStateToProps = ({ errors }) => ({
    errors
});

const mapDispatchToProps = dispatch => ({
    login: user => dispatch(login(user)),
    clearErrors: () => dispatch(clearErrors()),
    clearSuccess: () => dispatch(clearSuccess())
});



const LoginPage = ({ errors, login, clearErrors, clearSuccess }) => {
    useEffect(() => {
        clearErrors();
        clearSuccess();
        return () => {
            clearErrors()
        }
    }, [])
    
    const loginUser = (e) => {
        e.preventDefault();
        const user = {
            username: e.target.username.value,
            password: e.target.password.value
        }
        login(user);
    }

    const [isLoginVisible, setIsLoginVisible] = useState(false);

    const makeLoginVisible = () => {
        setIsLoginVisible(true);
        const backgroundImage = document.getElementById('background-image');
        backgroundImage.classList.remove('basketball-rim-background')
        backgroundImage.classList.add('basketball-rim-background-blurred');
        const header = document.getElementById('header')
        header.classList.remove('top-line')
        header.classList.add('bottom-line')
    }

    const makeLoginNotVisible = () => {
        setIsLoginVisible(false);
        const backgroundImage = document.getElementById('background-image');
        backgroundImage.classList.remove('basketball-rim-background-blurred');
        backgroundImage.classList.add('basketball-rim-background')
        const header = document.getElementById('header')
        header.classList.remove('bottom-line')
        header.classList.add('top-line')
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

        <div id ="background-image" className="login-page basketball-rim-background container-fluid">
            {isLoginVisible? <div className="row"><div className="login-page-top-space-true col"><i onClick={makeLoginNotVisible} className="material-icons md-36 pointer back-arrow">arrow_back</i></div></div>: <div className="row"><div className="login-page-top-space-false col"></div></div>}
            <h1 id="header" className="top-line">MYSPORTS</h1>
            {!isLoginVisible ? <div className="row justify-content-center"><button className="login-button col" onClick={makeLoginVisible}>Login</button></div>: null}
            {isLoginVisible ? (
                <div>
                    <form onSubmit={loginUser}>
                        <div className="login-form">
                            <div className="username">
                                <label htmlFor="username"><i className="material-icons md-24">account_circle</i></label>
                                <input type="text" id="username" name="username" placeholder="username" required />
                            </div>
                            {errors && <div className="container-fluid error-box"><div className="row justify-content-center"><p><i className="material-icons md-18 error-symbol">warning</i></p></div><div className="row justify-content-center"><p className="error-text">{errors}</p></div></div>}
                            <div className="password">
                                <label htmlFor="password"><i className="material-icons md-24">lock_outline</i></label>
                                <input type="password" id="password" name="password" placeholder="password" required />
                                <i id="eye" className="material-icons md-24" onClick={showPassword}>visibility</i>
                                {errors && <div className="row justify-content-center forgot-password-box"><p className="forgot-password-paragraph"><Link className='forgot-password-button' to="/forgotpassword">Forgot your password?</Link></p></div>}
                            </div>
                        </div>
                        <button id="login-button">Login</button>
                    </form>
                </div>
            ) : null}
            {!isLoginVisible ? (
                <div>
                    <div className="row justify-content-center">
                        <p className="col white-font">New to MySports?</p>
                    </div>
                    <div className="row justify-content-center">
                        <p className="col"><Link className="signup-button" to="/register">Sign Up</Link></p>
                    </div>
                </div>
            ) : null}
        </div>
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginPage);