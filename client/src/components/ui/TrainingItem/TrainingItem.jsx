import React, {useState} from 'react';
import TrainingImage from "../TrainingImage/TrainingImage";
import TrainingBrief from "../TrainingBrief/TrainingBrief";
import TrainingHeader from "../TrainingHeader/TrainingHeader";
import TrainingText from "../TrainingText/TrainingText";
import LockIcon from "../../icons/LockIcon/LockIcon";
import TrainingError from "../TrainingError/TrainingError";
import TrainingBriefInner from "../TrainingBriefInner/TrainingBriefInner";
import TrainingSubitemList from "../TrainingSubitemList/TrainingSubitemList";
import TrainingSubitem from "../TrainingSubitem/TrainingSubitem";
import {toJS} from "mobx";
import {observer} from "mobx-react-lite";

const TrainingItem = ({trainingInfo, ...props}) => {
    const [isShow, setShow] = useState(false)

    const toggleContentHandler = () => {
        if(trainingInfo.allowed_viewing) {
            setShow(!isShow)
        }
    }

    return (
        <div className="training-item" id={trainingInfo.id} {...props}>
           <TrainingImage src={trainingInfo.image_url}/>
            <TrainingBrief isShow={isShow}  onClick={toggleContentHandler}>
                <TrainingBriefInner
                    className={
                        trainingInfo.allowed_viewing
                        ? 'brief-locked-hidden'
                        : 'brief-locked'
                    }
                >
                    <LockIcon color="#000" overrideClass="training-lock-ic"/>
                    <TrainingError>
                        {trainingInfo.allowed_viewing
                            ? ''
                            : 'Эксклюзивно по подписке'
                        }
                    </TrainingError>
                </TrainingBriefInner>
                <TrainingHeader>
                    {trainingInfo.title}
                </TrainingHeader>
                <TrainingText>
                    {trainingInfo.short_description}
                </TrainingText>
            </TrainingBrief>
            <TrainingSubitemList isShow={isShow}>
                {trainingInfo.subsections.map((subitem, index, array) => {
                    const isNextViewed = array[(index - 1) + 1] !== undefined && array[(index - 1) + 1].viewed === false
                    const isViewed = array[index - 1]?.viewed === true
                    const isFirst = (index === 0)

                    if(isFirst) {
                        return <TrainingSubitem
                                    key={subitem.id}
                                    id={subitem.id}
                                    subitemInfo={subitem}
                                    active={true}
                                />
                    }

                    if(isViewed && isNextViewed) {
                        return <TrainingSubitem
                                    key={subitem.id}
                                    id={subitem.id}
                                    subitemInfo={subitem}
                                    active={true}
                                />
                    }

                    return <TrainingSubitem
                                key={subitem.id}
                                id={subitem.id}
                                subitemInfo={subitem}
                            />
                })}
            </TrainingSubitemList>
        </div>
    );
};

export default observer(TrainingItem);