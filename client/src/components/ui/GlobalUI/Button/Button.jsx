import React from 'react';

const Button = ({children, overrideClass, disabled, ...props}) => {
    return (
        <a className={`button-reusable ${overrideClass}`} {...props}>
            {children}
        </a>
    );
};

export default Button;