import React from 'react';
import ellipse from "../../../../assets/icons/ellipse.png";
import infinity from "../../../../assets/icons/infinity.png";
import InfinityIcon from "../../../icons/InfinityIcon/InfinityIcon";
import {tgWebApp} from "../../../../utils/telegramAPI";

const Subscribtion = ({isSubscribtionStarter, subscribtion}) => {
    return (
        <span id="timeout">
            {isSubscribtionStarter
                ? <InfinityIcon/>
                : <img className="ellipse" width="125" height="56" src={ellipse} alt=""/>
            }

            <span className="timeout-inner">
                <span className="subscription-name">
                    {subscribtion}
                </span>
            </span>
        </span>
    );
};

export default Subscribtion;