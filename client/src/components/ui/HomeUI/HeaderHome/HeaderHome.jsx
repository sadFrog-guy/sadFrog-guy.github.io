import React from 'react';
import Wrap from "../../../utils/Wrap/Wrap";
import Text from "../../GlobalUI/Text/Text";
import Avatar from "../../GlobalUI/Avatar/Avatar";
import LinkTG from "../../GlobalUI/LinkTG/LinkTG";
import QuestionIcon from "../../../icons/QuestionIcon/QuestionIcon";
import Header from "../../GlobalUI/Header/Header";
import {useContext} from "react";
import {Context} from "../../../../utils/context";
import {haptic, vibrationDuration} from "../../../../utils/telegramAPI";

const HeaderHome = () => {
    const {User} = useContext(Context);

    return (
        <Header>
            <Wrap className="user-info">
                <Text type="medium" id="username">{User.username}</Text>
                <Avatar source={User.avatar} onLoad={() => User.setAvatarLoaded(true)}/>
            </Wrap>
            <LinkTG onClick={haptic} source={User.course_support_link} id="settings-bubble">
                <QuestionIcon/>
            </LinkTG>
        </Header>
    );
};

export default HeaderHome;