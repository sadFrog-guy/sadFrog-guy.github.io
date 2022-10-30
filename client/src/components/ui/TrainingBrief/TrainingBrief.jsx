import React from 'react';

const TrainingBrief = ({children, isShow, ...props}) => {
    const briefActiveClass = "training-brief active"
    const briefClass = "training-brief"

    return (
        <div className={isShow ? briefActiveClass : briefClass} {...props}>
            <div className="training-brief-inner">
                <div className="brief-bg"/>
                {children}
            </div>
        </div>
    );
};

export default TrainingBrief;