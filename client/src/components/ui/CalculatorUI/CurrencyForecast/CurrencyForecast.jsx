import React from 'react';
import Wrap from "../../../utils/Wrap/Wrap";

const CurrencyForecast = ({title, children}) => {
    return (
        <Wrap className="currency-forecast">
            <span className="forecast-title">
                {title}
            </span>
            <span className="forecast-value">
                {children}
            </span>
        </Wrap>
    );
};

export default CurrencyForecast;