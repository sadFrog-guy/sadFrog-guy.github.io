import React, {useEffect, useRef, useState} from 'react';
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
import {backButtonHide, backButtonShow, exitConfirmation, haptic} from "../../../../utils/telegramAPI";
import {useNavigate} from "react-router-dom";

const CalculateForm = () => {
    const {Calculator} = useContext(Context)
    const [isLoading, setLoading] = useState(false)
    const [isDisabled, setDisabled] = useState(true)
    const [isClicked, setClicked] = useState(false)
    const navigate = useNavigate()

    const addCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    const removeNonNumeric = num => num.toString().replace(/[^0-9]/g, "");

    const inputOnChange = (e) => {
        const value = e.target.value.replace(/\D/g, "")

        setDisabled(false)
        setClicked(false)
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
        // clearInterval(Calculator.intervalId)
        if(Calculator.auto_update && !Calculator.error) await Calculator.getChains(Calculator.amount)
        // Calculator.setIntervalId(setInterval(Calculator.intervalId, Calculator.autoupdate_delay * 1000))
    }

    const buttonOnClick = debounce(async() => {
        haptic()

        if(Calculator.pre_amount && !Calculator.error) {
            if(Calculator.intervalId) clearInterval(Calculator.intervalId)
            setClicked(true)
            setLoading(true)

            if(isClicked === false) {
                Calculator.changeAmount(Calculator.pre_amount)
                await Calculator.getChains(Calculator.amount)
                Calculator.setImagesArray()
                setLoading(false)
                Calculator.setIntervalId(setInterval(intervalDelayUpdate, Calculator.autoupdate_delay * 1000))
            } else {
                setLoading(false)
                return false
            }
        } else {
            setDisabled(true)
        }
    }, 300)

    useEffect(() => {
        if(Calculator.counter === Calculator.imagesArray.length && Calculator.imagesArray.length > 0) {
            Calculator.setImagesLoaded(true)
        }
    },[Calculator.counter])

    useEffect(() => {
        if(Calculator.error) {
            setDisabled(true)
        } else {
            setDisabled(false)
        }
    }, [Calculator.error])

    useEffect(() => {
        exitConfirmation()

        backButtonShow(() => {
            clearInterval(Calculator.intervalId)
            navigate('/')
        })

        return () => {
            backButtonHide()
        }
    }, [])

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