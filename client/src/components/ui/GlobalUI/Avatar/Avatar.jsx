import React from 'react';

const Avatar = ({source}) => {
    return (
        <div className="avatar-wrap">
            <img src={source} id="avatar" alt="avatar"/>
        </div>
    );
};

export default Avatar;