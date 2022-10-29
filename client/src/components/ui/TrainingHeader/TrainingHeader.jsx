import React from 'react';

const TrainingHeader = ({children}) => {
    return (
        <h1 className="button-header button-header_training button-header_training__title">
            {children}
        </h1>
    );
};

export default TrainingHeader;