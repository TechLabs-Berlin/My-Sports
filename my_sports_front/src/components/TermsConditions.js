import React from 'react';

const TermsConditions = ({ id = "modal", onClose = () => { }, children }) => {

    const handleOutSideClick = (e) => {
        if (e.target.id == id) onClose();
    }

    return (
        <div id={id} className="modal" onClick={handleOutSideClick} >
            <div className="modal-container">
                <button className="close" onClick={onClose} />
                <div className="content">{children}</div>
            </div>
        </div>
    );
};

export default TermsConditions;