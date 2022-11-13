import React, {useContext} from 'react';
import Wrap from "../../../utils/Wrap/Wrap";
import Rectangle from "../../GlobalUI/Rectangle/Rectangle";
import LightingIcon from "../../../icons/LightingIcon/LightingIcon";
import {Context} from "../../../../utils/context";
import {observer} from "mobx-react-lite";
import {toJS} from "mobx";
import CurrencyItem from "../CurrencyItem/CurrencyItem";

const CurrencyList = () => {
    const {Calculator} = useContext(Context)

    return (
        <Wrap className="currency-list">
            {Calculator.error
                ? <h1>{Calculator.error}</h1>
                :
                Calculator.chains.map((chain, index) => {
                    return (
                        <CurrencyItem
                            chain={chain}
                            key={index}
                        />
                    )
                })
            }
        </Wrap>
    );
};

export default observer(CurrencyList);