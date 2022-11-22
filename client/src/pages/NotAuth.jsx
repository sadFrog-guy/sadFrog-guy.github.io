import React, {useEffect} from 'react';
import {Link, Navigate} from "react-router-dom";
import {NOT_AUTH} from "../router";
import {useContext} from "react";
import {Context} from "../utils/context";
import {observer} from "mobx-react-lite";
import Wrap from "../components/utils/Wrap/Wrap";
import Text from "../components/ui/GlobalUI/Text/Text";

const NotAuth = () => {
    const {Trainings} = useContext(Context)

    useEffect(() => {
        const fetchError = async() => {
            await Trainings.getAllTrainings()
        }

        fetchError()
    })

    return (
        <Wrap className="not-authorized">
            <Text type="medium" className="not-authorized-header">
                Закрыто
            </Text>
            <Text type="medium" overrideClass="not-authorized-text">
                {Trainings.error}
            </Text>
        </Wrap>
    );
};

export default observer(NotAuth);