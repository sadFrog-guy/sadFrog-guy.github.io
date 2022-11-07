import React from 'react';

const Button = ({children, ...props}) => {
    return (
        <a className="button-reusable" {...props}>
            {children}
        </a>
    );
};

export default Button;