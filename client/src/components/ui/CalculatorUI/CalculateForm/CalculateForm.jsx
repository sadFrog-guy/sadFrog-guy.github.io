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
import {debounce} from "debounce"
import {haptic} from "../../../../utils/telegramAPI";

const CalculateForm = () => {
    const {Calculator} = useContext(Context)
    const [isLoading, setLoading] = useState(false)
    const [isDisabled, setDisabled] = useState(true)
    const [isClicked, setClicked] = useState(false)
    const [val, setVal] = useState('')
    let intervalId

    const addCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    const removeNonNumeric = num => num.toString().replace(/[^0-9]/g, "");

    const inputOnChange = (e) => {
        const value = e.target.value.replace(/\D/g, "")

        setDisabled(false)
        Calculator.clearError()

        if(value > 0 || value === '') {
            Calculator.changePreAmount(value)
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

    const buttonOnClick = debounce(async() => {
        haptic()

        if(Calculator.pre_amount && !Calculator.error) {
            setLoading(true)

            Calculator.changeAmount(Calculator.pre_amount)
            await Calculator.getChains(Calculator.amount)

            setLoading(false)

            Calculator.setImagesArray()
            intervalId = setInterval(intervalDelayUpdate, Calculator.autoupdate_delay * 1000)
        } else {
            setDisabled(true)
        }
    }, 300)

    useEffect(() => {
        if(Calculator.counter === Calculator.imagesArray.length && Calculator.imagesArray.length > 0) {
            Calculator.setImagesLoaded(true)
        }

        console.log(Calculator.counter + ', ' + Calculator.imagesArray.length)
    },[Calculator.counter])

    useEffect(() => {
        return () => {
            Calculator.changeAmount(0)
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
                value={addCommas(removeNonNumeric(Calculator.pre_amount))}
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