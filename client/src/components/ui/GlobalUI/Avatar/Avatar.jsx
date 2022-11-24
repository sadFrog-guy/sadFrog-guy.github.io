import React, {useContext} from 'react';
import {Context} from "../../../../utils/context";

const Avatar = ({source}) => {
    const {User} = useContext(Context)

    return (
        <div className="avatar-wrap">
            <img src={source} id="avatar" alt="avatar"/>
        </div>
    );
};

export default Avatar;