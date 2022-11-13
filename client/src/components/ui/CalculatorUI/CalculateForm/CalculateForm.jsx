import React, {useState} from 'react';
import Input from "../../GlobalUI/Input/Input";
import Button from "../../GlobalUI/Button/Button";
import Wrap from "../../../utils/Wrap/Wrap";
import {useContext} from "react";
import {Context} from "../../../../utils/context";
import LoaderButton from "../../GlobalUI/LoaderButton/LoaderButton";
import {observer} from "mobx-react-lite";
import {isMobile} from "react-device-detect";

const CalculateForm = () => {
    const {Calculator} = useContext(Context)
    const [isLoading, setIsLoading] = useState(false)

    const inputOnChange = (e) => {
        const value = e.target.value.replace(/\D/g, "")

        if(value > 0) {
            e.target.value = value
            Calculator.changeAmount(value)
        }
    }

    const buttonOnClick = async() => {
        if(Calculator.amount) {
            setIsLoading(true)
            await Calculator.getChains(Calculator.amount)
            setIsLoading(false)
        }
    }

    return (
        <Wrap className="form">
            <Input
                min="0"
                pattern="/^\d+$/"
                onChange={inputOnChange}
                type={isMobile ? "tel" : "number"}
                placeholder="Введите сумму прогрутки"
            />
            <Button overrideClass="calculator_button" onClick={buttonOnClick}>
                Рассчитать
                {isLoading && <LoaderButton/>}
            </Button>
        </Wrap>
    );
};

export default observer(CalculateForm);