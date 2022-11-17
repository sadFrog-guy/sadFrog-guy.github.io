import React, {useContext, useRef} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import Navigation from "../../components/ui/GlobalUI/Navigation/Navigation";
import Wrapper from "../../components/utils/Wrapper/Wrapper";
import Wrap from "../../components/utils/Wrap/Wrap";
import {Context} from "../../utils/context";
import {
    backButtonShow,
    exitConfirmation,
    haptic,
    tgButtonInitial,
    tgButtonText,
    tgMainButton
} from "../../utils/telegramAPI";
import {finishPendingStatus, finishStatus, viewedStatus} from "../../utils/consts";
import {useEffect} from "react";
import {useState} from "react";

const TrainingFrame = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const {Trainings} = useContext(Context)
    const frameRef = useRef(null)
    const [height, setHeight] = useState("0px")
    const [src, setSrc] = useState(id)

    const onLoad = () => {
        setHeight(ref.current.contentWindow.document.body.scrollHeight + "px");
    };

    const tgButton = () => {
        if(window.location.href.includes("/trainings/")) {
            tgButtonInitial()

            if(Trainings.training.viewed) {
                tgButtonText(viewedStatus)
            } else {
                tgButtonText(finishStatus)
            }

            const onClickHandler = async() => {
                haptic()

                if(Trainings.training.viewed && tgMainButton.text === viewedStatus) {
                    setSrc(Trainings.training.next_article_id)

                    window.scrollTo(0, 0)
                } else {
                    tgButtonText(finishPendingStatus)

                    await Trainings.readTraining(id)

                    window.scrollTo(0, 0)

                    if(Trainings.training.viewed && !Trainings.training.next_article_id) {
                        tgMainButton.hide()
                    } else {
                        setSrc(Trainings.training.next_article_id)

                        tgButtonText(viewedStatus)
                        window.scrollTo(0, 0)
                    }
                }
            }

            tgMainButton.onClick(onClickHandler)

            if(Trainings.training.viewed && !Trainings.training.next_article_id) {
                tgMainButton.hide()
            }
        }
    }

    const handleScroll = () => {
        const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 170

        if(bottom) {
            tgMainButton.show()
        } else {
            tgMainButton.hide()
        }
    };

    useEffect(() => {
        if(Trainings.training.viewed) {
            tgButtonText(viewedStatus)
        } else {
            tgButtonText(finishStatus)
        }
    }, [Trainings.training.viewed])

    useEffect(() => {
        exitConfirmation()

        window.scrollTo(0, 0)

        backButtonShow(() => {
            navigate('/trainings')
        })

        window.addEventListener('scroll', handleScroll)
        tgButton()

        return () => {
            tgMainButton.hide()
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <Wrapper>
            <Wrap className="article">
                <Navigation to="/trainings">
                    Обучение
                </Navigation>

                <iframe
                    frameborder="0"
                    className="iframe-wrap"
                    height={height}
                    ref={frameRef}
                    onLoad={onLoad}
                    width="100%"
                    src={`https://${window.location.hostname}/trainings/frame/${src}`}
                />
            </Wrap>
        </Wrapper>
    );
};

export default TrainingFrame;