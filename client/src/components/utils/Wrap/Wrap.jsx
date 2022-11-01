import React from 'react';

const Wrap = ({children, ...props}) => {
    return (
        <div {...props}>
            {children}
        </div>
    );
};

export default Wrap;