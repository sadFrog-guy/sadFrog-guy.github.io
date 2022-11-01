import React from 'react';

const Copied = ({children, isCopied}) => {
    return (
        <span className={isCopied ? 'copied active' : 'copied'}>
            {children}
        </span>
    );
};

export default Copied;