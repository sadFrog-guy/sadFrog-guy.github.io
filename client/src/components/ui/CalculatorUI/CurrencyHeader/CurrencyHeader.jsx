import React, {useContext} from 'react';
import CurrencyName from "../CurrencyName/CurrencyName";
import CurrencyCode from "../CurrencyCode/CurrencyCode";
import Wrap from "../../../utils/Wrap/Wrap";
import {Context} from "../../../../utils/context";

const CurrencyHeader = ({icon, name, code}) => {
    const {Calculator} = useContext(Context)

    return (
        <Wrap className="currency-header">
            <div className="bubble-white">
                <img onLoad={() => Calculator.setCounter(Calculator.counter++)} src={icon} alt=""/>
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