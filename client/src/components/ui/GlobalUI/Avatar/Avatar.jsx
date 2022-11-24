import React, {useContext} from 'react';
import {Context} from "../../../../utils/context";

const Avatar = ({source}) => {
    const {User} = useContext(Context)

    return (
        <div className="avatar-wrap">
            <img src={source} onLoad={() => User.setAvatarLoaded(true)} id="avatar" alt="avatar"/>
        </div>
    );
};

export default Avatar;