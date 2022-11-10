import React from 'react';
import CurrencyName from "../CurrencyName/CurrencyName";
import CurrencyCode from "../CurrencyCode/CurrencyCode";
import Wrap from "../../../utils/Wrap/Wrap";

const CurrencyHeader = ({icon, name, code}) => {
    return (
        <Wrap className="currency-header">
            <div className="bubble-white">
                <img src={icon} alt=""/>
            </div>
            <span>
                <CurrencyName>
                    {name}
                </CurrencyName>
                {' '}
                <CurrencyCode>
                    {code}
                </CurrencyCode>
            </span>
        </Wrap>
    );
};

export default CurrencyHeader;