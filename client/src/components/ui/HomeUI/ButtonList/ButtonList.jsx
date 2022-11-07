import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import {LINK_CALCULATOR, LINK_REFERAL, LINK_TRAININGS} from "../../../../router";
import Wrap from "../../../utils/Wrap/Wrap";
import P2PIcon from "../../../icons/P2PIcon/P2PIcon";
import SectionHeader from "../../GlobalUI/SectionHeader/SectionHeader";
import Text from "../../GlobalUI/Text/Text";
import ArrowIcon from "../../../icons/ArrowIcon/ArrowIcon";
import LockIcon from "../../../icons/LockIcon/LockIcon";
import {Context} from "../../../../utils/context";
import {haptic, vibrationDuration} from "../../../../utils/consts";

const ButtonList = ({modalShow}) => {
    const {User} = useContext(Context);

    const linkOnClick = (e) => {
        haptic()

        console.log(e.target)

        if(!User.user.allowed_training || !User.user.allowed_calculator) {
            modalShow()
        }
    }

    return (
        <Wrap className="button-group">
            <Link
                to={User.user.allowed_training ? LINK_TRAININGS : ''}
                onClick={linkOnClick}
                className="button"
                id="training"
            >
                <Wrap className="training-wrap main_training-wrap">
                    <P2PIcon/>
                    <SectionHeader className="button-header button-header_training">
                        Обучение
                    </SectionHeader>
                </Wrap>
                <Text type="medium" className="training-content">
                    {User.user.training_description}
                </Text>

                <Wrap className="calculator-bg"/>
            </Link>
            <Link
                to={User.user.allowed_calculator ? LINK_CALCULATOR : ''}
                onClick={linkOnClick}
                className="button"
                id="calculator"
            >
                <SectionHeader className="button-header button-header_calculator">
                    Калькулятор

                    {User.user.allowed_calculator
                        ? <ArrowIcon color="#fff"/>
                        : <LockIcon color="#fff"/>
                    }
                </SectionHeader>
            </Link>
            <Link
                to={LINK_REFERAL}
                className="button"
                id="ref"
                onClick={linkOnClick}
            >
                Реферальная система
                <Wrap className="bubble-wrap bubble-wrap_main arrow-wrap">
                    <ArrowIcon/>
                </Wrap>
            </Link>
        </Wrap>
    );
};

export default ButtonList;