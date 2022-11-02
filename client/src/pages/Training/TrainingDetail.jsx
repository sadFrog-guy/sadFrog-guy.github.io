import React, {useRef} from 'react';
import {useParams} from "react-router-dom";
import Navigation from "../../components/ui/GlobalUI/Navigation/Navigation";
import Loader from "../../components/ui/GlobalUI/Loader/Loader";
import {useContext, useEffect, useState} from "react";
import {Context} from "../../utils/context";
import Wrap from "../../components/utils/Wrap/Wrap";
import Text from "../../components/ui/GlobalUI/Text/Text";
import {isIOS} from "../../utils/isIOS";
import Button from "../../components/ui/GlobalUI/Button/Button";
import {openLinkExternal, tgHideButton, tgID, tgToggleButton} from "../../utils/consts";
import Plyr from "plyr-react"
import "plyr-react/plyr.css"
import Wrapper from "../../components/utils/Wrapper/Wrapper";

const TrainingDetail = () => {
    const id = useParams()
    const {Trainings} = useContext(Context);
    const [isLoading, setLoading] = useState(true)
    const [openInBrowser, setOpenInBrowser] = useState(false)

    const trackScrolling = () => {
        if((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
            tgToggleButton(Trainings.training.viewed)
        } else {
            tgHideButton()
        }
    }

    const browserRedirect = async() => {
        await Trainings.getAccessToVideo(id)
        openLinkExternal(Trainings.video_link)
    }

    useEffect(() => {
        async function fetchData() {
            await Trainings.getOneTraining(id)
            setLoading(false)
        }

        fetchData()

    }, [])

    window.addEventListener('scroll', trackScrolling)

    return (
        <Wrapper>
            <Loader
                isLoading={isLoading}
            />

            <Navigation>
                Обучение
            </Navigation>

            <Wrap className="article">
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

                    {/*{isIOS() &&*/}
                         <video
                            controls
                            className="video"
                            disablePictureInPicture
                            controlsList="noplaybackrate nodownload"
                            src={Trainings.training.video_url}
                            poster={Trainings.training.video_preview_image}
                        />
                    {/*}*/}

                    {openInBrowser &&
                        <div className="go-to-browser">
                            <Button onClick={browserRedirect} id="go-to-button">
                                Перейти в браузер для просмотра урока
                            </Button>
                        </div>
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
        </Wrapper>
    );
};

export default TrainingDetail;