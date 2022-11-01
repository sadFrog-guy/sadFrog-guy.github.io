import React from 'react';
import {useParams} from "react-router-dom";
import Navigation from "../../components/ui/GlobalUI/Navigation/Navigation";
import Loader from "../../components/ui/GlobalUI/Loader/Loader";
import {useContext, useEffect, useState} from "react";
import {Context} from "../../utils/context";
import useModal from "../../hooks/useModal";
import Wrap from "../../components/utils/Wrap/Wrap";
import Text from "../../components/ui/GlobalUI/Text/Text";
import Player from "../../components/ui/GlobalUI/Player/Player";
import {isIOS} from "../../utils/isIOS";
import Button from "../../components/ui/GlobalUI/Button/Button";

const TrainingDetail = () => {
    const id = useParams()
    const {Trainings} = useContext(Context);
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            await Trainings.getOneTraining(id)
            await Trainings.getAccessToVideo(id)
            setLoading(false)
        }
        fetchData()
    }, [])

    return (
        <div className="wrapper">
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

                    {Trainings.training.video_url && isIOS() === true
                        ? <video
                            controls
                            className="video"
                            disablePictureInPicture
                            controlsList="noplaybackrate nodownload"
                            src={Trainings.training.video_url}
                        />
                        : Trainings.training.video_url && isIOS() === false
                        && <div className="go-to-browser">
                                <Button id="go-to-button">
                                    <a href={Trainings.video_link} target="_blank">
                                        Перейти в браузер для просмотра урока
                                    </a>
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
        </div>
    );
};

export default TrainingDetail;