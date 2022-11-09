import React from 'react';
import Wrapper from "../components/utils/Wrapper/Wrapper";
import Navigation from "../components/ui/GlobalUI/Navigation/Navigation";

const Calculator = () => {
    return (
        <Wrapper>

            <Navigation to="/">
                Калькулятор
            </Navigation>

            <input type="text" id="referal-link" value={100}/>

        </Wrapper>
    );
};

export default Calculator;