import React from 'react';
import ArrowIcon from "../../icons/ArrowIcon/ArrowIcon";

const Header = ({children, backButtonOnClick}) => {
    return (
        <header className="header referal_header training_header">
            <div className="bubble-wrap bubble-wrap_referal bubble-arrow-wrap" onClick={backButtonOnClick}>
                <ArrowIcon color="#000"/>
            </div>
            <span className="medium">
                {children}
            </span>
        </header>
    );
};

export default Header;