import React, {useContext} from 'react';
import Wrap from "../../../utils/Wrap/Wrap";
import {Context} from "../../../../utils/context";
import {observer} from "mobx-react-lite";
import CurrencyItem from "../CurrencyItem/CurrencyItem";
import {Navigate} from "react-router-dom";
import {NOT_AUTH} from "../../../../router";

const CurrencyList = () => {
    const {Calculator} = useContext(Context)

    return (
        <Wrap className="currency-list">
            {Calculator.chains.map((chain, index) => {
                    return (
                        <CurrencyItem
                            chain={chain}
                            key={index}
                        />
                    )
                })
            }

            {Calculator.have_subscribe === false && <Navigate to={NOT_AUTH}/>}
        </Wrap>
    );
};

export default observer(CurrencyList);