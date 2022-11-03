import React from 'react';
import {useState} from "react";

const TrainingImage = ({src}) => {
    const [isLoaded, setLoaded] = useState(false)

    return (
        <div className="training-image-wrap">
            <div className={isLoaded ? 'preloader' : 'preloader active'}>
                <div className="preloader-spin"/>
            </div>
            <img
                style={isLoaded ? {} : {display: 'none'}}
                width="375"
                height="212"
                rel="preload"
                src={src}
                alt=""
                className="training-image"
                onLoad={() => setLoaded(true)}
            />
        </div>
    );
};

export default TrainingImage;