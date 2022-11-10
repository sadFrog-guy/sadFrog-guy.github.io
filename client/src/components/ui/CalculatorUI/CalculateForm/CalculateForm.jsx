import React, {useState} from 'react';
import Input from "../../GlobalUI/Input/Input";
import Button from "../../GlobalUI/Button/Button";
import Wrap from "../../../utils/Wrap/Wrap";
import {useContext} from "react";
import {Context} from "../../../../utils/context";
import LoaderButton from "../../GlobalUI/LoaderButton/LoaderButton";
import {observer} from "mobx-react-lite";

const CalculateForm = () => {
    const {Calculator} = useContext(Context)
    const [isLoading, setIsLoading] = useState(false)

    const inputOnChange = (e) => {
        if(e.target.value < 0) {
            Calculator.changeAmount(0)
        } else {
            Calculator.changeAmount(e.target.value)
        }
    }

    const buttonOnClick = async() => {
        setIsLoading(true)
        await Calculator.getChains(Calculator.amount)
        setIsLoading(false)
    }

    return (
        <Wrap className="form">
            <Input value={Calculator.amount} onChange={inputOnChange}/>
            <Button overrideClass="calculator_button" onClick={buttonOnClick}>
                Рассчитать
                {isLoading && <LoaderButton/>}
            </Button>
        </Wrap>
    );
};

export default observer(CalculateForm);