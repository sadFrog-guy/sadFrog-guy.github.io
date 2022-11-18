import React from 'react';
import {useState} from "react";

const TrainingImage = ({src}) => {
    return (
        <div className="training-image-wrap">
            <img
                width="375"
                height="212"
                src={src}
                alt=""
                className="training-image"
            />
        </div>
    );
};

export default TrainingImage;