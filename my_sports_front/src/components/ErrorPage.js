import React from 'react';
import { Link } from 'react-router-dom';

export default function ErrorPage({ errors }) {
    return (
        <div className="container-fluid silver-background">
            <h1 className="forgot-password-header">MYSPORTS</h1>
            <div className="form-box">
                <i className="material-icons md-48 error-symbol forgot-password-error">clear</i>
                <p className="forgot-password-error-message">Oops! {errors}</p>
            </div>
            <div className="row justify-content-center">
            <p className="col"><Link className="back-to-login-button" to="/dashboard">Back to Dashboard</Link></p>
            </div>
        </div>
    )
}
