import React from 'react';

const CurrencyName = ({children}) => {
    return (
        <span className="currency-name">
            {children}
        </span>
    );
};

export default CurrencyName;