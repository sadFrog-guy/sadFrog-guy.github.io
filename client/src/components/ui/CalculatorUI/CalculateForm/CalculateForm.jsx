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
import {clear} from "@testing-library/user-event/dist/clear";

const CalculateForm = () => {
    const {Calculator} = useContext(Context)
    const [isLoading, setIsLoading] = useState(false)
    const [isDisabled, setDisabled] = useState(true)
    let intervalId

    const addCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    const removeNonNumeric = num => num.toString().replace(/[^0-9]/g, "");

    const inputOnChange = (e) => {
        const value = e.target.value.replace(/\D/g, "")

        if(value > 0) {
            Calculator.changeAmount(value)
        }

        if(value.startsWith('0')) {
            setDisabled(true)
        }
    }

    const inputOnFocus = () => {
        Calculator.clearError()
        setDisabled(false)
    }

    const intervalDelayUpdate = async() => {
        clearInterval(intervalId)
        if(Calculator.auto_update && !Calculator.error) await Calculator.getChains(Calculator.amount)
        intervalId = setInterval(intervalDelayUpdate, Calculator.autoupdate_delay * 1000)
    }

    const buttonOnClick = async() => {
        if(Calculator.amount && !Calculator.error) {
            setIsLoading(true)
            await Calculator.getChains(Calculator.amount)

            intervalId = setInterval(intervalDelayUpdate, Calculator.autoupdate_delay * 1000)

            setIsLoading(false)
        } else {
            setDisabled(true)
        }
    }

    useEffect(() => {
        return () => {
            clearInterval(intervalId)
        }
    }, [])

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