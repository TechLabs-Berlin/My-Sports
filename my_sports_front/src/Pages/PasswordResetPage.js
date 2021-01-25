import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { toggleCodeOk, getUsername, updateSuccessToggle } from '../actions/resetPassword';
import { receiveErrors } from '../actions/error';
import { receiveSuccess } from '../actions/success';
import axios from 'axios';
import ReactTooltip from 'react-tooltip';
import { Link } from 'react-router-dom';

const mapDispatchToProps = dispatch => ({
    toggleCodeOk: () => dispatch(toggleCodeOk()),
    updateSuccessToggle: () => dispatch(updateSuccessToggle()),
    getUsername: (payload) => dispatch(getUsername(payload)),
    receiveErrors: (payload) => dispatch(receiveErrors(payload)),
    receiveSuccess: (payload) => dispatch(receiveSuccess(payload))
});

const mapStateToProps = ({ resetPassword, errors, success }) => ({
    resetPassword,
    errors,
    success
})

const PasswordResetPage = ({ match, getUsername, toggleCodeOk, resetPassword, updateSuccessToggle, receiveErrors, errors, success, receiveSuccess }) => {
    useEffect(async() => {
        const { code } = match.params;
        await axios
            .get(`/api/users/reset/` + code,)
            .then((response) => {
                getUsername(response.data);
                toggleCodeOk();
            })
            .catch((error) => {
                receiveErrors(error.response.data.message)
            })
      }, [])

    const updatePassword = async(e) => {
        e.preventDefault();
        await axios
        .put('/api/users/updatepassword/', {
            username: resetPassword.username,
            password: e.target.password.value
        })
        .then((response) => {
            if (response.data.message === 'password updated') {
                updateSuccessToggle();
                receiveSuccess(response.data.message);
            }
        })
        .catch((error) => {
            receiveErrors(error.response.data.message);
        })
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
        <div className="container-fluid basketball-rim-background-blurred">
            <h1 className="forgot-password-header">MYSPORTS</h1>
            {!errors && !success && <div className="form-box">
                <p className="forgot-password-instructions">Please enter a new password for your account.</p>
                <form onSubmit={updatePassword}>
                    <div className="email">
                        <label htmlFor="password"><i className="material-icons md-24">lock_outline</i></label>
                        <input type="password" id="password" name="password" placeholder="Password" minLength="8" pattern="(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,12}" data-tip="Passwords must be between 8 and 12 characters long. They must containt atleast 1 letter and 1 number." required />
                        <ReactTooltip place="top" type="light" effect="solid" border={true} borderColor="black"/>
                        <i id="eye" className="material-icons md-24" onClick={showPassword}>visibility</i>
                    </div>
                    <p className="forgot-password-instructions">We will email you a link to reset your password.</p>
                    <button className="send-email-button">Send</button>
                </form>
            </div>}
            {errors && <div className="form-box">
                <i className="material-icons md-48 error-symbol forgot-password-error">clear</i>
                <p className="forgot-password-error-message">Oops! This link is invalid or may be expired!</p>
            </div>}
            {success && <div className="form-box">
                <i className="material-icons md-48 success-symbol forgot-password-success">done</i>
                <p className="forgot-password-success-message">Your password has been succesfully reset!</p>
            </div>}
            <div className="row justify-content-center">
                <p className="col"><Link className="back-to-login-button" to="/login">Back to login</Link></p>
            </div>
        </div>
    )
}
//

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(PasswordResetPage);