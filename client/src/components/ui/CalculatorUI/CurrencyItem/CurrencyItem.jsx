import React from 'react';
import LightingIcon from "../../../icons/LightingIcon/LightingIcon";
import Wrap from "../../../utils/Wrap/Wrap";
import Rectangle from "../../GlobalUI/Rectangle/Rectangle";
import CurrencyHeader from "../CurrencyHeader/CurrencyHeader";
import CurrencyForecast from "../CurrencyForecast/CurrencyForecast";
import CurrencyValue from "../CurrencyValue/CurrencyValue";

const CurrencyItem = ({chain, ...props}) => {
    let currencyStyle

    switch (chain.style) {
        case "lightning":
            currencyStyle = "lightning"
            break

        case "green":
            currencyStyle = "green"
            break

        case "red":
            currencyStyle = "red"
            break
    }

    return (
        <Rectangle overrideClass={`currency-item ${currencyStyle}`} {...props}>
            {chain.style === 'lightning' && <LightingIcon/>}

            <CurrencyHeader
                icon={chain.currency_icon}
                name={chain.currency_name}
                code={chain.currency_code}
            />

            <CurrencyValue
                spread={chain.spread}
                profit={chain.profit}
            />

            <Wrap className="currency-market">
                <img src={chain.market_logo} className="market-logo" alt=""/>
            </Wrap>
        </Rectangle>
    );
};

export default CurrencyItem;