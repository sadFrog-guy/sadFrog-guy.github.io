import React, {useRef} from 'react';
import {useLocation, useNavigate, useParams} from "react-router-dom";
import Navigation from "../../components/ui/GlobalUI/Navigation/Navigation";
import Loader from "../../components/ui/GlobalUI/Loader/Loader";
import {useContext, useEffect, useState} from "react";
import {Context} from "../../utils/context";
import Wrap from "../../components/utils/Wrap/Wrap";
import Text from "../../components/ui/GlobalUI/Text/Text";
import {isIOS} from "../../utils/isIOS";
import {
    openLinkExternal, tgButtonInitial,
    tgButtonText,
    tgMainButton,
    tgToggleButton,
    tgWebApp
} from "../../utils/consts";
import Wrapper from "../../components/utils/Wrapper/Wrapper";
import {observer} from "mobx-react-lite";
import Button from "../../components/ui/GlobalUI/Button/Button";
import fullscreen from "../../assets/icons/fullscreen.png";

const TrainingDetail = () => {
    const id = useParams()
    const navigate = useNavigate()
    const location = useLocation()
    const {Trainings} = useContext(Context)
    const [isLoading, setLoading] = useState(true)
    const [openInBrowser, setOpenInBrowser] = useState(false)

    const tgButtonFunctionality = () => {
        if(location.pathname.includes("/trainings/")) {
            const viewedStatus = "Прочитано"
            const finishStatus = "Завершить"
            const finishPendingStatus = "Завершается..."

            tgButtonInitial()

            tgMainButton.show()

            const viewedOnClick = () => {
                console.log('redirected to ' + Trainings.training.next_article_id)
                navigate('/trainings/' + Trainings.training.next_article_id, {replace: true})
            }

            const finishOnClick = async() => {
                tgButtonText(finishPendingStatus)
                await Trainings.readTraining(id)
                tgButtonText(viewedStatus)
            }

            if(Trainings.training.viewed) {
                tgMainButton.offClick(finishOnClick)
                tgButtonText(viewedStatus)
                tgMainButton.onClick(viewedOnClick)
            } else {
                tgMainButton.offClick(viewedOnClick)
                tgButtonText(finishStatus)
                tgMainButton.onClick(finishOnClick)
            }
        }
    }

    const browserRedirect = async() => {
        await Trainings.getAccessToVideo(id)
        openLinkExternal(Trainings.video_link)
    }

    const onFullscreen = () => {
        if(openInBrowser) {
            setOpenInBrowser(false)
        } else {
            setOpenInBrowser(true)
        }
    }

    useEffect(() => {
        async function fetchData() {
            await Trainings.getOneTraining(id)
            setLoading(false)
        }
        fetchData()
    }, [])

    useEffect(() => {
        tgButtonFunctionality()

        return () => {
            tgMainButton.hide()
        }
    }, [Trainings.training])

    return (
        <Wrapper>
            {!isLoading
                ?
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
                                onClick={() => {
                                    navigate(`/trainings/4`)
                                }}
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
                :
                <Loader
                    isLoading={isLoading}
                />
            }
        </Wrapper>
    );
};

export default observer(TrainingDetail);