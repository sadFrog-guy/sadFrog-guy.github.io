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

const Calculator = () => {
    const {Calculator} = useContext(Context)
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        const fetchData = async() => {
            setLoading(true)
            await Calculator.getChains(Calculator.amount)
            setLoading(false)
        }

        fetchData()
    }, [])

    return (
        <Wrapper>
            {!isLoading
                ?
                <Wrap>
                    <Navigation to="/">
                        Калькулятор
                    </Navigation>

                    <CalculateForm/>

                    <CurrencyList/>
                </Wrap>
                :
                <Loader isLoading={isLoading}/>
            }
        </Wrapper>
    );
};

export default Calculator;