import React from 'react';
import {Link} from "react-router-dom";
import LockIcon from "../../icons/LockIcon/LockIcon";

const Modal = ({children, isActive, modalHide}) => {
    return (
        <div className={isActive ? 'modal active' : 'modal'}>
            <div className="modal-background" onClick={modalHide}></div>
            <div className="modal-inner">
                {children}
            </div>
        </div>
    );
};

export default Modal;