import React from 'react';
import Wrap from "../../../utils/Wrap/Wrap";
import Text from "../../GlobalUI/Text/Text";
import Avatar from "../../GlobalUI/Avatar/Avatar";
import LinkTG from "../../GlobalUI/LinkTG/LinkTG";
import QuestionIcon from "../../../icons/QuestionIcon/QuestionIcon";
import Header from "../../GlobalUI/Header/Header";
import {useContext} from "react";
import {Context} from "../../../../utils/context";
import {vibrationDuration} from "../../../../utils/consts";

const HeaderHome = ({avatarOnLoad}) => {
    const {User} = useContext(Context);

    const linkOnClick = () => {
        window.navigator.vibrate(vibrationDuration)
    }

    return (
        <Header>
            <Wrap className="user-info">
                <Text type="medium" id="username">{User.username}</Text>
                <Avatar onLoad={avatarOnLoad} source={User.avatar}/>
            </Wrap>
            <LinkTG onClick={linkOnClick} source={User.technical_support_link} id="settings-bubble">
                <QuestionIcon/>
            </LinkTG>
        </Header>
    );
};

export default HeaderHome;