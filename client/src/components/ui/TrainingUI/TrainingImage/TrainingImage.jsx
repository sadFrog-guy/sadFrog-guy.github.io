import React from 'react';

const TrainingImage = ({src}) => {
    return (
        <div className="training-image-wrap">
            <img rel="preload" src={src} alt="" className="training-image"/>
        </div>
    );
};

export default TrainingImage;