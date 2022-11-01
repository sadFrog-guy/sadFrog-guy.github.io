import React from 'react';

const SectionHeader = ({children, ...props}) => {
    return (
        <h1 {...props}>
            {children}
        </h1>
    );
};

export default SectionHeader;