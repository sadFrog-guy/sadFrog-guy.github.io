import React from 'react';

const Button = ({children, ...props}) => {
    return (
        <span className="button-reusable" {...props}>
            {children}
        </span>
    );
};

export default Button;