import React from 'react';
import {useState} from "react";

const TrainingImage = ({src, onLoad}) => {
    return (
        <div className="training-image-wrap">
            <img
                width="375"
                height="212"
                src={src}
                onLoad={onLoad}
                alt=""
                className="training-image"
            />
        </div>
    );
};

export default TrainingImage;