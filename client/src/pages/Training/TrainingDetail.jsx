import React, {useRef} from 'react';
import {Navigate, useLocation, useNavigate, useParams, useSearchParams} from "react-router-dom";
import Navigation from "../../components/ui/GlobalUI/Navigation/Navigation";
import Loader from "../../components/ui/GlobalUI/Loader/Loader";
import {useContext, useEffect, useState} from "react";
import {Context} from "../../utils/context";
import Wrap from "../../components/utils/Wrap/Wrap";
import Text from "../../components/ui/GlobalUI/Text/Text";
import {isIOS} from "../../utils/isIOS";
import {
    backButtonShow, exitConfirmation,
    haptic,
    openLinkExternal, tgButtonInitial,
    tgButtonText,
    tgMainButton, tgWebApp,
} from "../../utils/telegramAPI";
import Wrapper from "../../components/utils/Wrapper/Wrapper";
import {observer} from "mobx-react-lite";
import Button from "../../components/ui/GlobalUI/Button/Button";
import fullscreen from "../../assets/icons/fullscreen.png";
import {LINK_TRAININGS_ITEM, NOT_AUTH} from "../../router";
import {useTelegramButton} from "../../hooks/useTelegramButton";
import {useVideo} from "../../hooks/useVideo";
import ButtonTG from "../../components/ui/GlobalUI/ButtonTG/ButtonTG";
import {finishPendingStatus, finishStatus, viewedStatus} from "../../utils/consts";
import {isAndroid} from "react-device-detect";

const TrainingDetail = ({id}) => {
    const navigate = useNavigate()
    const videoRef = useRef(null)
    const {Trainings} = useContext(Context)
    const [isLoading, setLoading] = useState(true)
    const [openInBrowser, setOpenInBrowser] = useState(false)
    const [hide, setHide] = useState('')
    const {onFullscreen, browserRedirect} = useVideo(Trainings, id, videoRef, openInBrowser, setOpenInBrowser)

    const tgButton = () => {
        if(window.location.href.includes("section_id")) {
            tgButtonInitial()

            const onClickHandler = async() => {
                haptic()

                if(Trainings.training.viewed && tgMainButton.text === viewedStatus) {
                    await Trainings.getOneTraining(Trainings.training.next_article_id)

                    window.scrollTo(0, 0)
                } else {
                    console.log(Trainings.training.viewed)
                    tgButtonText(finishPendingStatus)

                    await Trainings.readTraining(id)

                    window.scrollTo(0, 0)

                    if(Trainings.training.viewed && !Trainings.training.next_article_id) {
                        tgMainButton.hide()
                    } else {
                        await Trainings.getOneTraining(Trainings.training.next_article_id)
                        tgButtonText(viewedStatus)

                        window.scrollTo(0, 0)
                    }
                }
            }

            tgMainButton.onClick(onClickHandler)

            if(Trainings.training.viewed) {
                tgButtonText(viewedStatus)
            } else {
                tgButtonText(finishStatus)
            }

            if(Trainings.training.viewed && !Trainings.training.next_article_id) {
                tgMainButton.hide()
            }
        }
    }

    const handleScroll = () => {
        const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 100

        if(bottom) {
            tgMainButton.show()
        } else {
            tgMainButton.hide()
        }
    };

    useEffect(() => {
        exitConfirmation()

        backButtonShow(() => {
            navigate('/trainings')
        })

        async function fetchData() {
            await Trainings.getOneTraining(id)
            window.addEventListener('scroll', handleScroll)
            tgButton()
            setLoading(false)
        }

        fetchData()

        return () => {
            tgMainButton.hide()
        }
    }, [])

    return (
        <Wrapper>
            <Wrap className="article">
                <Navigation to="/trainings">
                    Обучение
                </Navigation>

                <h1 className="button-header article_button-header" id="article-title">
                    {Trainings.training.title}
                </h1>

                <Wrap className="training-image-wrap article_image-wrap">
                    {Trainings.training.image_url &&
                        <img
                            className="training-image" id="article-image"
                            src={Trainings.training.image_url}
                            rel="preload"
                            alt=""
                        />
                    }

                    {Trainings.training.video_url &&
                        <Wrap className="video-wrapper">
                            <video
                                controls
                                className="video"
                                disablePictureInPicture
                                controlsList={`noplaybackrate nodownload ${isIOS() === false ? 'nofullscreen' : ''}`}
                                src={Trainings.training.video_url}
                                poster={Trainings.training.video_preview_image}
                                ref={videoRef}
                            />
                            {!isIOS() &&
                                <div className="fullscreen-button" onClick={onFullscreen}>
                                    <img className="icon-fullscreen" src={fullscreen} alt=""/>
                                </div>
                            }

                            <div className={`go-to-browser ${openInBrowser ? 'active' : ''}`}>
                                <Button onClick={browserRedirect} id="go-to-button">
                                    Перейти в браузер для просмотра урока
                                </Button>
                                <div className="fullscreen-button go-to" onClick={onFullscreen}>
                                    <img className="icon-fullscreen" src={fullscreen} alt=""/>
                                </div>
                            </div>
                        </Wrap>
                    }
                </Wrap>
                <Wrap className="article-content">
                    <Text type="medium" overrideClass="article_medium" id="article-bold">
                        {Trainings.training.bold_text}
                    </Text>
                    <Text type="medium" overrideClass="text article_text" id="article-content">
                        {Trainings.training.main_text}
                    </Text>
                </Wrap>
            </Wrap>

            <Loader
                isLoading={isLoading}
            />

            {Trainings.training.success === false
                &&
                <Wrap className="not-found">
                    <Text type="medium">{Trainings.training.comment}</Text>
                </Wrap>
            }

            {Trainings.have_subscribe === false
                && <Navigate to={NOT_AUTH}/>
            }
        </Wrapper>
    );
};

export default observer(TrainingDetail);