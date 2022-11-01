import React from 'react';
import P2PIcon from "../../../icons/P2PIcon/P2PIcon";

const TrainingList = ({children, title}) => {
    return (
        <div className="training">
            <div className="training-wrap">
                <P2PIcon/>
                <h1 className="button-header button-header_training__page">
                    {title}
                </h1>
            </div>
            {children}
        </div>
    );
};

export default TrainingList;