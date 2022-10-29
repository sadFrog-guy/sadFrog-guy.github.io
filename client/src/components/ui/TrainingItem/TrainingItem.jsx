import React from 'react';
import TrainingImage from "../TrainingImage/TrainingImage";
import TrainingBrief from "../TrainingBrief/TrainingBrief";
import TrainingHeader from "../TrainingHeader/TrainingHeader";
import TrainingText from "../TrainingText/TrainingText";
import LockIcon from "../../icons/LockIcon/LockIcon";
import TrainingError from "../TrainingError/TrainingError";
import TrainingBriefInner from "../TrainingBriefInner/TrainingBriefInner";
import TrainingSubitem from "../TrainingSubitem/TrainingSubitem";

const TrainingItem = ({imageUrl, title, description, isAllowed, viewed, ...props}) => {
    return (
        <div className="training-item" {...props}>
           <TrainingImage src={imageUrl}/>
            <TrainingBrief>
                <TrainingBriefInner
                    className={
                        isAllowed
                        ? 'brief-locked-hidden'
                        : 'brief-locked'
                    }
                >
                    <LockIcon color="#000" overrideClass="training-lock-ic"/>
                    <TrainingError>
                        {isAllowed
                            ? 'Эксклюзивно по подписке'
                            : ''
                        }
                    </TrainingError>
                </TrainingBriefInner>
                <TrainingHeader>
                    {title}
                </TrainingHeader>
                <TrainingText>
                    {description}
                </TrainingText>
            </TrainingBrief>
            <TrainingSubitem>

            </TrainingSubitem>
        </div>
    );
};

export default TrainingItem;