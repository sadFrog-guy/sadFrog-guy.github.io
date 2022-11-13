import React from 'react';
import {Link, Navigate} from "react-router-dom";
import {NOT_AUTH} from "../router";
import {useContext} from "react";
import {Context} from "../utils/context";
import {observer} from "mobx-react-lite";
import Wrap from "../components/utils/Wrap/Wrap";
import Text from "../components/ui/GlobalUI/Text/Text";

const NotAuth = () => {
    const checkAuthorized = () => {
        const UserComment = window.localStorage.getItem("comment-user")
        const TrainingComment = window.localStorage.getItem("comment-training")

        if(UserComment && !TrainingComment) {
            return UserComment
        } else {
            return TrainingComment
        }
    }

    return (
        <Wrap className="not-authorized">
            <Text type="medium" className="not-authorized-header">
                Закрыто
            </Text>
            <Text type="medium" overrideClass="not-authorized-text">
                {checkAuthorized()}
            </Text>
            <Link to="/" className="not-authorized-link">
                Попробовать еще раз
            </Link>
        </Wrap>
    );
};

export default observer(NotAuth);