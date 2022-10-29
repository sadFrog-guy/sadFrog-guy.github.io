import React from 'react';

const ModalHeader = ({children}) => {
    return (
        <h1 className="modal-header">
            {children}
        </h1>
    );
};

export default ModalHeader;