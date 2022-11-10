import React from 'react';
import lines from "../../../../assets/images/lines.png";
import BalanceTitle from "../BalanceTitle/BalanceTitle";
import SectionHeader from "../../GlobalUI/SectionHeader/SectionHeader";
import Wrap from "../../../utils/Wrap/Wrap";
import Rectangle from "../../GlobalUI/Rectangle/Rectangle";

const ReferalBalance = ({balance, title}) => {
    return (
        <Rectangle>
            <BalanceTitle>
                {title}
            </BalanceTitle>
            <SectionHeader id="balance" className="button-header button-header_balance">
                {balance}
            </SectionHeader>
            <img src={lines} alt="lines" className="lines"/>
        </Rectangle>
    );
};

export default ReferalBalance;