import React from 'react';

const Loader = ({isLoading}) => {
    return (
        <div className={`loader-wrap ${isLoading && 'active'}`}>
            <div className="loader"/>
        </div>
    );
};

export default Loader;