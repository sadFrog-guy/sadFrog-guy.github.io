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
        const TrainingDetailComment = window.localStorage.getItem("comment-training-detail")
        const ReferalComment = window.localStorage.getItem("comment-referal")

        if(UserComment) {
            console.log(UserComment)
            return UserComment
        }

        if(TrainingComment) {
            console.log(TrainingComment)
            return TrainingComment
        }

        if(TrainingDetailComment) {
            return TrainingDetailComment
        }

        if(ReferalComment) {
            console.log(ReferalComment)
            return ReferalComment
        }

        return ''
    }

    return (
        <Wrap className="not-authorized">
            <Text type="medium" className="not-authorized-header">
                Закрыто
            </Text>
            <Text type="medium" overrideClass="not-authorized-text">
                {checkAuthorized()}
            </Text>
        </Wrap>
    );
};

export default observer(NotAuth);