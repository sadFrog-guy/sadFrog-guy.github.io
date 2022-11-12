import React from 'react';
import Wrap from "../../../utils/Wrap/Wrap";

const Input = ({overrideClass, type, ...props}) => {
    return (
        <Wrap className={`input-wrap ${overrideClass}`}>
            <input type={type} className="input" {...props}/>
        </Wrap>
    );
};

export default Input;