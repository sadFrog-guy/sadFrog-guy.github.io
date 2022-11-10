import React from 'react';
import Wrap from "../../../utils/Wrap/Wrap";

const Rectangle = ({children, overrideClass, ...props}) => {
    return (
        <Wrap className={`balance-wrap ${overrideClass}`} {...props}>
            {children}
        </Wrap>
    );
};

export default Rectangle;