import React from 'react';
import Wrap from "../../../utils/Wrap/Wrap";

const Input = ({overrideClass, ...props}) => {
    return (
        <Wrap className={`input-wrap ${overrideClass}`}>
            <input type="number" className="input" {...props}/>
        </Wrap>
    );
};

export default Input;