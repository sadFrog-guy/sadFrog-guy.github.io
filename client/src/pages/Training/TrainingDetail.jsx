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
    backButtonHide,
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
import {useVideo} from "../../hooks/useVideo";
import {finishPendingStatus, finishStatus, viewedStatus} from "../../utils/consts";
import {isAndroid} from "react-device-detect";

const TrainingDetail = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    const videoRef = useRef(null)
    const {Trainings} = useContext(Context)
    const [isLoading, setLoading] = useState(true)
    const [openInBrowser, setOpenInBrowser] = useState(false)
    const {onFullscreen, browserRedirect} = useVideo(Trainings, id, videoRef, openInBrowser, setOpenInBrowser)

    console.log('read training with id - ' + id)

    const tgButton = () => {
        if(window.location.href.includes("/trainings/")) {
            tgButtonInitial()

            if(Trainings.viewed) {
                tgButtonText(viewedStatus)
            } else {
                tgButtonText(finishStatus)
            }

            if(Trainings.next_article_id === null && Trainings.viewed) {
                tgMainButton.hide()
            }

            const onClickHandler = async() => {
                haptic()

                if(Trainings.viewed && tgMainButton.text === viewedStatus) {
                    if(Trainings.next_article_id) {
                        navigate(`/trainings/${Trainings.next_article_id}`)
                        navigate(0)
                    }
                } else {
                    tgButtonText(finishPendingStatus)

                    await Trainings.readTraining(id)

                    if(Trainings.viewed && !Trainings.next_article_id) {
                        tgMainButton.hide()
                    } else {
                        navigate(`/trainings/${Trainings.next_article_id}`)
                        tgButtonText(viewedStatus)

                        navigate(0)
                    }
                }
            }

            const onClickHandlerAndroid = async() => {
                if(!Trainings.viewed && tgMainButton.text === finishStatus) {
                    tgButtonText(finishPendingStatus)
                    await Trainings.readTraining(id)
                    tgButtonText(viewedStatus)
                }
            }

            if(isAndroid) {
                tgMainButton.onClick(onClickHandlerAndroid)
            } else {
                tgMainButton.onClick(onClickHandler)
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
        if(Trainings.viewed) {
            tgButtonText(viewedStatus)
        } else {
            tgButtonText(finishStatus)
        }
    }, [Trainings.viewed])

    useEffect(() => {
        exitConfirmation()

        backButtonShow(() => {
            navigate('/trainings')
        })

        async function fetchData() {
            await Trainings.getOneTraining(id)
            if(!Trainings.training.video_url && !Trainings.training.image_url) setLoading(false)
            setLoading(false)
            tgButton()
        }

        fetchData()
    }, [])

    useEffect(() => {
        const screenHeight = window.innerHeight;
        const totalHeight = document.body.scrollHeight;

        window.scrollTo(0, 0)

        if(screenHeight < totalHeight) {
            window.addEventListener('scroll', handleScroll)
        }

        if(screenHeight === totalHeight && isLoading === false) {
            tgMainButton.show()
        }

        return () => {
            window.removeEventListener('scroll', handleScroll)
            tgMainButton.hide()
        }
    })

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
                            onLoad={() => setLoading(false)}
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
                                src={`https://crypto-learn.ru/private_file/976284834/18420430318bcba34901069bbb73c6979d551d6a0c164376930112256f36ee98/article-4-main_video`}
                                poster={Trainings.training.video_preview_image}
                                ref={videoRef}
                                // onLoadedData={() => setLoading(false)}
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
                        {Trainings.bold_text}
                    </Text>
                    <Text type="medium" overrideClass="text article_text" id="article-content">
                        {Trainings.main_text}
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