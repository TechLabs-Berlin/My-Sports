import React, { useEffect } from 'react'
import { requestEmail } from '../util/password';
import { Link } from 'react-router-dom';
import { clearSuccess, receiveSuccessFunc } from '../actions/success';
import { clearErrors, receiveErrorsFunc } from '../actions/error';
import { connect } from "react-redux";

const mapStateToProps = ({ errors, success }) => ({
    errors,
    success
});

const mapDispatchToProps = dispatch => ({
    receiveSuccessFunc: payload => dispatch(receiveSuccessFunc(payload)),
    clearErrors: () => dispatch(clearErrors()),
    clearSuccess: () => dispatch(clearSuccess()),
    receiveErrorsFunc: payload => dispatch(receiveErrorsFunc(payload))
});

const ForgotPasswordPage = ({ errors, success, receiveSuccessFunc, clearErrors, clearSuccess, receiveErrorsFunc }) => {
    useEffect(() => {
        return () => {
            clearErrors();
            clearSuccess();
        }
    }, [])

    const sendEmail = async (e) => {
        e.preventDefault();
        const input = {
            email: e.target.email.value
        }
        const request = await requestEmail(input)
        if (request) {
            const payload = 'Done! You got mail!';
            return receiveSuccessFunc(payload);
        } else {
            const payload = 'The email you entered is not registered.';
            return receiveErrorsFunc(payload);
        }  
    }
    
    return (
        <div className="container-fluid basketball-rim-background-blurred">
            <div>.</div>
            <div className="desktop-container">
                <h1 className="header-with-login-visible">MYSPORTS</h1>
                {!errors && !success && <div className="form-box">
                    <div className="row justify-content-center">
                        <p className="forgot-password-instructions">Enter the email address associated with your account.</p>
                        <form onSubmit={sendEmail}>
                            <div className="row justify-content-center"> 
                                <div className="forgot-password-email-div row justify-content-start">
                                    <i className="material-icons md-24 remove-email-icon-margin p-0">email</i>
                                    <input className="forgot-password-input" type="email" id="email" name="email" placeholder="Email address" required></input>
                                </div>
                            </div>
                            <p className="forgot-password-instructions">We will email you a link to reset your password.</p>
                            <div className="row justify-content-center"><button className="send-email-button">Send</button></div>
                        </form>
                    </div>
                </div>}
                {errors && <div className="form-box">
                    <div className="row justify-content-center">
                        <i className="material-icons md-48 error-symbol forgot-password-error">clear</i>
                        <p className="forgot-password-error-message">{errors}</p>
                    </div>
                </div>}
                {success && <div className="form-box">
                    <div className="row justify-content-center">
                        <i className="material-icons md-48 success-symbol forgot-password-success">done</i>
                        <p className="forgot-password-success-message">{success}</p>
                    </div>
                </div>}
                <div className="row justify-content-center">
                    <p className="col"><Link className="back-to-login-button" to="/login">Back to login</Link></p>
                </div>
            </div>
        </div>
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ForgotPasswordPage);