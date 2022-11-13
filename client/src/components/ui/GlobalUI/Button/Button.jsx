import React from 'react';

const Button = ({children, isDisabled, overrideClass, disabled, ...props}) => {
    return (
        <a
            className={`${isDisabled ? 'button-reusable button-reusable-disabled' : 'button-reusable'}
             ${overrideClass}`}
            {...props}
        >
            {children}
        </a>
    );
};

export default Button;