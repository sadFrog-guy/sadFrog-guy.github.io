import React from 'react';
import Text from "../../GlobalUI/Text/Text";
import Wrap from "../../../utils/Wrap/Wrap";

const ReferalDescription = ({header, children}) => {
    return (
        <Wrap className="description">
            <Text type="medium" overrideClass="referal_medium">
                {header}
            </Text>
            <Text>
                {children}
            </Text>
        </Wrap>
    );
};

export default ReferalDescription;