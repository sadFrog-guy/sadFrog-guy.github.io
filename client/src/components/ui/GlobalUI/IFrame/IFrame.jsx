import React from 'react';
import {useRef, useState} from "react";

const IFrame = ({...props}) => {
    return (
        <iframe
            {...props}
            frameborder="0"
        />
    );
};

export default IFrame;