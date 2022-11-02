import React from 'react';

const Wrapper = ({children, overrideClass}) => {
    return (
        <div className={`wrapper ${overrideClass}`}>
            {children}
        </div>
    );
};

export default Wrapper;