import React from 'react';
import lines from "../../../../assets/images/lines.png";
import BalanceTitle from "../BalanceTitle/BalanceTitle";
import SectionHeader from "../../GlobalUI/SectionHeader/SectionHeader";
import Wrap from "../../../utils/Wrap/Wrap";

const ReferalBalance = ({balance, title}) => {
    return (
        <Wrap className="balance-wrap">
            <BalanceTitle>
                {title}
            </BalanceTitle>
            <SectionHeader id="balance" className="button-header button-header_balance">
                {balance}
            </SectionHeader>
            <img src={lines} alt="lines" className="lines"/>
        </Wrap>
    );
};

export default ReferalBalance;