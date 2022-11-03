import React from 'react';

const Wrapper = ({children, ...props}) => {
    return (
        <div className="wrapper" {...props}>
            {children}
        </div>
    );
};

export default Wrapper;