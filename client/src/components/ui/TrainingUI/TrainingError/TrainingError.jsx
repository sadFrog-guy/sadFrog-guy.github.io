import React from 'react';

const TrainingError = ({children}) => {
    return (
        <span className="brief-error">
            {children}
        </span>
    );
};

export default TrainingError;