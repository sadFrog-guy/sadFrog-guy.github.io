import React, {useState} from 'react';
import TrainingImage from "../TrainingImage/TrainingImage";
import TrainingBrief from "../TrainingBrief/TrainingBrief";
import TrainingHeader from "../TrainingHeader/TrainingHeader";
import TrainingText from "../TrainingText/TrainingText";
import LockIcon from "../../../icons/LockIcon/LockIcon";
import TrainingError from "../TrainingError/TrainingError";
import TrainingBriefInner from "../TrainingBriefInner/TrainingBriefInner";
import TrainingSubitemList from "../TrainingSubitemList/TrainingSubitemList";
import TrainingSubitem from "../TrainingSubitem/TrainingSubitem";
import {toJS} from "mobx";
import {observer} from "mobx-react-lite";
import CheckIcon from "../../../icons/CheckIcon/CheckIcon";
import {tgWebApp} from "../../../../utils/consts";
import useModal from "../../../../hooks/useModal";

const TrainingItem = ({trainingInfo, imageOnLoad, ...props}) => {
    const [isShow, setShow] = useState(false)
    const {modalActive, modalHide, modalShow} = useModal()

    const toggleContentHandler = () => {
        if(trainingInfo.allowed_viewing) {
            setShow(!isShow)
        }
    }

    return (
        <div className="training-item" id={trainingInfo.id} {...props}>
            <TrainingImage src={trainingInfo.image_url} onLoad={imageOnLoad}/>
            <TrainingBrief isShow={isShow}  onClick={toggleContentHandler}>
                <TrainingBriefInner
                    className={
                        trainingInfo.allowed_viewing
                        ? 'brief-locked-hidden'
                        : 'brief-locked'
                    }
                >
                    <LockIcon color={tgWebApp.colorScheme === 'dark' ? '#fff' : '#000'} overrideClass="training-lock-ic"/>
                    <TrainingError>
                        {trainingInfo.allowed_viewing
                            ? ''
                            : 'Эксклюзивно по подписке'
                        }
                    </TrainingError>
                </TrainingBriefInner>
                <TrainingHeader>
                    {trainingInfo.title}

                    {trainingInfo.viewed && <CheckIcon overrideClass="check-ic-training"/>}
                </TrainingHeader>
                <TrainingText>
                    {trainingInfo.short_description}
                </TrainingText>
            </TrainingBrief>
            {trainingInfo.allowed_viewing &&
                <TrainingSubitemList isShow={isShow}>
                    {trainingInfo.subsections.map((subitem, index) => {
                        const isFirst = (index === 0)
                        const isViewed = subitem.viewed
                        const isAllowed = subitem.allowed_viewing
                        const condition = isFirst || isAllowed || isViewed

                        return <TrainingSubitem
                            key={subitem.id}
                            id={subitem.id}
                            subitemInfo={subitem}
                            viewed={subitem.viewed}
                            to={condition ? `/trainings/${subitem.id}` : ''}
                            active={!!condition}
                            allowedViewing={subitem.allowed_viewing}
                            onClick={modalShow}
                        />
                    })}
                </TrainingSubitemList>
            }
        </div>
    );
};

export default observer(TrainingItem);