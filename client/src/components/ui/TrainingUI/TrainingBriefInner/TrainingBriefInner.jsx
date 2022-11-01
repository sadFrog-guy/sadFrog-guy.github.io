import React from 'react';

const TrainingBriefInner = ({children, className}) => {
    return (
        <div className={className}>
            <div className="brief-locked-inner">
                {children}
            </div>
        </div>
    );
};

export default TrainingBriefInner;