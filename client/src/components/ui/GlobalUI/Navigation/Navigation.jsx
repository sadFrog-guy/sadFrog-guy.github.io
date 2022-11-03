import React from 'react';
import ArrowIcon from "../../../icons/ArrowIcon/ArrowIcon";
import {useNavigate} from "react-router-dom";

const Navigation = ({children, to}) => {
    const navigate = useNavigate()

    return (
        <header className="header referal_header training_header">
            <div className="bubble-wrap bubble-wrap_referal bubble-arrow-wrap" onClick={() => navigate(to ? to : -1)}>
                <ArrowIcon color="#000"/>
            </div>
            <span className="medium">
                {children}
            </span>
        </header>
    );
};

export default Navigation;