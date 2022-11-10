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
            {Calculator.chains.length !== 0
                ?
                Calculator.chains.map((chain, index) => {
                    return (
                        <CurrencyItem
                            chain={chain}
                            key={index}
                        />
                    )
                })
                :
                <h1>На введённую сумму связок нет, попробуйте другую</h1>
            }
        </Wrap>
    );
};

export default observer(CurrencyList);