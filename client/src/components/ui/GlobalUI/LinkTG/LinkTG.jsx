import React from 'react';

const LinkTG = ({children, source, ...props}) => {
    return (
        <a href={source} {...props}>
            {children}
        </a>
    );
};

export default LinkTG;