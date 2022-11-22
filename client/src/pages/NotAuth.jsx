import React, {useEffect, useState} from 'react';
import {Link, Navigate} from "react-router-dom";
import {NOT_AUTH} from "../router";
import {useContext} from "react";
import {Context} from "../utils/context";
import {observer} from "mobx-react-lite";
import Wrap from "../components/utils/Wrap/Wrap";
import Text from "../components/ui/GlobalUI/Text/Text";
import Loader from "../components/ui/GlobalUI/Loader/Loader";

const NotAuth = () => {
    const {Trainings} = useContext(Context)
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        const fetchError = async() => {
            setLoading(true)
            await Trainings.getAllTrainings()
            setLoading(false)
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

            <Loader isLoading={isLoading}/>
        </Wrap>
    );
};

export default observer(NotAuth);