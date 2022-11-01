import React from 'react';
import LockIcon from "../../../icons/LockIcon/LockIcon";
import {toJS} from "mobx";
import CheckIcon from "../../../icons/CheckIcon/CheckIcon";
import {Link} from "react-router-dom";

const TrainingSubitem = ({subitemInfo, viewed, allowedViewing, active = false, ...props}) => {
    const subitemClasses = ["training-lesson"]

    if(active) {
        subitemClasses.push("active")
    }

    return (
        <Link
            className={subitemClasses.join(' ')}
            {...props}
        >
            {subitemInfo.title}

            {allowedViewing
                ? ""
                : <LockIcon color="#AAB2BD" overrideClass="subtheme-lock-ic"/>
            }

            {viewed
                ? <CheckIcon/>
                : ""
            }
        </Link>
    );
};

export default TrainingSubitem;