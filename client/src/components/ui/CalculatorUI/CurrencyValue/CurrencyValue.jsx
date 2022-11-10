import React from 'react';
import CurrencyForecast from "../CurrencyForecast/CurrencyForecast";
import Wrap from "../../../utils/Wrap/Wrap";

const CurrencyValue = ({spread, profit}) => {
    const million = 1000000

    return (
        <Wrap className="currency-value">
            <CurrencyForecast
                title="Спред"
            >
                {spread}%
            </CurrencyForecast>

            <CurrencyForecast
                title="Прибыль"
            >
                {profit > million
                    ? 'Ошибка'
                    : `${profit.toLocaleString().replace(/,/g, ' ')} ₽`
                }
            </CurrencyForecast>
        </Wrap>
    );
};

export default CurrencyValue;