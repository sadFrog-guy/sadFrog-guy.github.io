import React from 'react';
import ArrowIcon from "../../icons/ArrowIcon/ArrowIcon";

const Header = ({children}) => {
    return (
        <header className="header referal_header training_header">
            <div className="bubble-wrap bubble-wrap_referal bubble-arrow-wrap">
                <ArrowIcon color="#000"/>
            </div>
            <span className="medium">
                {children}
            </span>
        </header>
    );
};

export default Header;