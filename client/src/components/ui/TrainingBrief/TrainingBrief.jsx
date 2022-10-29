import React from 'react';

const TrainingBrief = ({children}) => {
    return (
        <div className="training-brief">
            <div className="training-brief-inner">
                <div className="brief-bg"></div>
                {children}
            </div>
        </div>
    );
};

export default TrainingBrief;