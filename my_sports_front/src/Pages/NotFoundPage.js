import React from 'react';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
    return (
        <div className="container-fluid basketball-rim-background-blurred">
            <h1 className="forgot-password-header">MYSPORTS</h1>
            <div className="form-box">
                <i className="material-icons md-48 error-symbol forgot-password-error">clear</i>
                <p className="forgot-password-error-message">Oops! 404: This page was not found!</p>
            </div>
            <div className="row justify-content-center">
                <p className="col"><Link className="back-to-login-button" to="/login">Back to login</Link></p>
            </div>
        </div>
    )
}

export default DashboardPage;