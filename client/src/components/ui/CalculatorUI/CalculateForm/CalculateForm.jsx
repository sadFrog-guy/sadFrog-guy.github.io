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
import {haptic} from "../../../../utils/telegramAPI";

const CalculateForm = () => {
    const {Calculator} = useContext(Context)
    const [isLoading, setIsLoading] = useState(false)
    const [isDisabled, setDisabled] = useState(true)
    let intervalId

    const addCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    const removeNonNumeric = num => num.toString().replace(/[^0-9]/g, "");

    const inputOnChange = (e) => {
        const value = e.target.value.replace(/\D/g, "")

        if(value >= 0) {
            Calculator.changeAmount(value)
            setDisabled(false)
        } else {
            setDisabled(true)
        }

    }

    const inputOnFocus = () => {
        Calculator.clearError()
    }

    const buttonOnClick = async() => {
        if(!isDisabled) {
            haptic()

            setIsLoading(true)
            await Calculator.getChains(Calculator.amount)
            setIsLoading(false)
        } else {
            setDisabled(true)
        }

        if(Calculator.error) {
            setDisabled(true)
        }
    }

    useEffect(() => {
        if(Calculator.auto_update) {
            intervalId = setInterval(async() => {
                await Calculator.getChains(Calculator.amount)
            }, Calculator.autoupdate_delay)
        }

        return () => {
            clearInterval(intervalId)
        }
    }, [Calculator.auto_update])

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
                pattern="/^\d+$/"
                onChange={inputOnChange}
                onFocus={inputOnFocus}
                value={addCommas(removeNonNumeric(Calculator.amount))}
                type={isMobile ? "tel" : "text"}
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