import React from 'react';
import infinity from "../../../../assets/icons/infinity.png";
import ellipse from "../../../../assets/icons/ellipse.png";

const Subscribtion = ({isSubscribtionStarter, subscribtion}) => {
    return (
        <span id="timeout">
            {isSubscribtionStarter
                ? <img className="infinity" width="121" height="43" src={infinity} alt=""/>
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