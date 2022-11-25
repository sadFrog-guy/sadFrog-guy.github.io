import React, {useEffect, useState} from 'react';
import Wrapper from "../components/utils/Wrapper/Wrapper";
import Navigation from "../components/ui/GlobalUI/Navigation/Navigation";
import Input from "../components/ui/GlobalUI/Input/Input";
import Wrap from "../components/utils/Wrap/Wrap";
import Button from "../components/ui/GlobalUI/Button/Button";
import CalculateForm from "../components/ui/CalculatorUI/CalculateForm/CalculateForm";
import CurrencyList from "../components/ui/CalculatorUI/CurrencyList/CurrencyList";
import {useContext} from "react";
import {Context} from "../utils/context";
import Loader from "../components/ui/GlobalUI/Loader/Loader";
import {backButtonHide, backButtonShow, exitConfirmation} from "../utils/telegramAPI";
import {useNavigate} from "react-router-dom";
import {useRef} from "@types/react";

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