import React from 'react';
import {useRef, useState} from "react";

const IFrame = ({...props}) => {
    const frameRef = useRef(null)
    const [height, setHeight] = useState("0px")

    const onLoad = () => {
        setHeight(frameRef.current.contentWindow.document.body.scrollHeight + "px");
    }

    return (
        <iframe
            {...props}
            height={height}
            ref={frameRef}
            onLoad={onLoad}
            frameborder="0"
            width="100%"
        />
    );
};

export default IFrame;