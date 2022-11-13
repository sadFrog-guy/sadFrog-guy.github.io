import React from 'react';
import {Link, Navigate} from "react-router-dom";
import {NOT_AUTH} from "../router";
import {useContext} from "react";
import {Context} from "../utils/context";
import {observer} from "mobx-react-lite";

const NotAuth = () => {
    const {User, Trainings} = useContext(Context);

    const checkAuthorized = () => {
        if(User.comment && !Trainings.comment) {
            return User.comment
        } else if(!User.comment && Trainings.comment) {
            return Trainings.comment
        }
    }

    return (
        <h1>
            {checkAuthorized()}

            <Link to="/">
                перейти на главную
            </Link>
        </h1>
    );
};

export default observer(NotAuth);