import React from 'react';
import { Link } from 'react-router-dom';

export default function SuccessPage({ success }) {
    return (
        <div className="container-fluid silver-background">
            <h1 className="forgot-password-header">MYSPORTS</h1>
            <div className="form-box">
                <i className="material-icons md-48 success-symbol forgot-password-success">done</i>
                <p className="forgot-password-success-message">{success}</p>
            </div>
            <div className="row justify-content-center">
            <p className="col"><Link className="back-to-login-button" to="/dashboard">Back to Dashboard</Link></p>
            </div>
        </div>
    )
}
