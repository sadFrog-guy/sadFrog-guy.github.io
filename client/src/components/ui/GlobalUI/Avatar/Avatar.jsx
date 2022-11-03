import React from 'react';

const Avatar = ({source, onLoad}) => {
    return (
        <div className="avatar-wrap">
            <img src={source} onLoad={onLoad} id="avatar" alt="avatar"/>
        </div>
    );
};

export default Avatar;