import React from 'react';
import Plyr from "plyr-react"
import "plyr-react/plyr.css"
import {toJS} from "mobx";

const Player = ({video}) => {
    return (
        <Plyr
            source={{
                type: "video",
                sources: [{src: video}]
            }}
        />
    );
};

export default Player;