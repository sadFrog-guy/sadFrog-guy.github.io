import React, {useEffect, useState} from 'react';
import Input from "../../GlobalUI/Input/Input";
import Button from "../../GlobalUI/Button/Button";
import Wrap from "../../../utils/Wrap/Wrap";
import {useContext} from "react";
import {Context} from "../../../../utils/context";
import LoaderButton from "../../GlobalUI/LoaderButton/LoaderButton";
import {observer} from "mobx-react-lite";
import {isMobile} from "react-device-detect";
import Text from "../../GlobalUI/Text/Text";

const CalculateForm = () => {
    const {Calculator} = useContext(Context)
    const [isLoading, setIsLoading] = useState(false)
    const [isDisabled, setDisabled] = useState(true)

    const inputOnChange = (e) => {
        const value = e.target.value.replace(/\D/g, "")

        if(value >= 0) {
            Calculator.changeAmount(value)
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }

    const buttonOnClick = async() => {
        if(Calculator.amount) {
            setIsLoading(true)
            await Calculator.getChains(Calculator.amount)
            setIsLoading(false)
        } else {
            setDisabled(true)
        }
    }

    useEffect(() => {
        if(Calculator.error) {
            setDisabled(true)
        } else {
            setDisabled(false)
        }
    }, [Calculator.error])

    return (
        <Wrap className="form">
            <Input
                min="0"
                pattern="/^\d+$/"
                onChange={inputOnChange}
                value={Calculator.amount}
                type={isMobile ? "tel" : "number"}
                placeholder="Введите сумму прокрутки"
                overrideClass="calculator-input"
            />
            <Text type="medium" overrideClass="calculator-error">
                {Calculator.error}
            </Text>
            <Button isDisabled={isDisabled} overrideClass="calculator_button" onClick={buttonOnClick}>
                Рассчитать
                {isLoading && <LoaderButton/>}
            </Button>
        </Wrap>
    );
};

export default observer(CalculateForm);