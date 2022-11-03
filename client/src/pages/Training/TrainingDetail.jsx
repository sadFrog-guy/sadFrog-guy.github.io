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

            const onClickHandler = async() => {
                if(Trainings.training.viewed) {
                    navigate('/trainings/' + Trainings.training.next_article_id, {replace: true})
                    navigate(0)
                } else {
                    tgButtonText(finishPendingStatus)

                    await Trainings.readTraining(id)

                    if(Trainings.training.viewed && !Trainings.training.next_article_id) {
                        tgMainButton.hide()
                    } else {
                        navigate('/trainings/' + Trainings.training.next_article_id, {replace: true})
                        navigate(0)
                    }
                }
            }

            tgMainButton.onClick(onClickHandler)

            if(Trainings.training.viewed) {
                tgButtonText(viewedStatus)
            } else {
                tgButtonText(finishStatus)
            }

            tgButtonInitial()

            if(Trainings.training.viewed && !Trainings.training.next_article_id) {
                tgMainButton.hide()
            } else {
                tgMainButton.show()
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
            tgButtonFunctionality()
            setLoading(false)
        }
        fetchData()

        return () => {
            tgMainButton.hide()
        }
    }, [])

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