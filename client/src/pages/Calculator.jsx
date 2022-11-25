import React, {useEffect, useState} from 'react';
import Wrapper from "../components/utils/Wrapper/Wrapper";
import Navigation from "../components/ui/GlobalUI/Navigation/Navigation";
import CalculateForm from "../components/ui/CalculatorUI/CalculateForm/CalculateForm";
import CurrencyList from "../components/ui/CalculatorUI/CurrencyList/CurrencyList";
import {useRef} from "react";

const Calculator = () => {
    const intervalId = useRef(null)

    return (
        <Wrapper>
            <Navigation to="/" callback={() => clearInterval(intervalId.current)}>
                Калькулятор
            </Navigation>

            <CalculateForm intervalId={intervalId}/>

            <CurrencyList/>
        </Wrapper>
    )
};

export default Calculator;