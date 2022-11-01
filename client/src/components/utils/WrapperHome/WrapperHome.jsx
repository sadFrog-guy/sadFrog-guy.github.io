import React from 'react';

const WrapperHome = ({children}) => {
    return (
        <main className="main">
            <div className="main-inner">
                {children}
            </div>
        </main>
    );
};

export default WrapperHome;