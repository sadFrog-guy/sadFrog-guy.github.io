import React from 'react';

const Text = ({children, type, overrideClass, ...props}) => {
    return (
        <span
            className={type === 'medium' ? `medium ${overrideClass}` : `grey ${overrideClass}`}
            {...props}
        >
            {children}
        </span>
    );
};

export default Text;