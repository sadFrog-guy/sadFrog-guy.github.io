import React from 'react';

const CurrencyCode = ({children}) => {
    return (
        <span className="currency-code">
            {children}
        </span>
    );
};

export default CurrencyCode;