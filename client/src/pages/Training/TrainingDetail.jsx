import React, {useRef} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import Navigation from "../../components/ui/GlobalUI/Navigation/Navigation";
import Loader from "../../components/ui/GlobalUI/Loader/Loader";
import {useContext, useEffect, useState} from "react";
import {Context} from "../../utils/context";
import Wrap from "../../components/utils/Wrap/Wrap";
import Text from "../../components/ui/GlobalUI/Text/Text";
import {isIOS} from "../../utils/isIOS";
import {
    openLinkExternal,
    tgButtonText,
    tgMainButton,
    tgToggleButton,
    tgWebApp
} from "../../utils/consts";
import Wrapper from "../../components/utils/Wrapper/Wrapper";
import {observer} from "mobx-react-lite";

const TrainingDetail = () => {
    const id = useParams()
    const navigate = useNavigate();
    const {Trainings} = useContext(Context);
    const [isLoading, setLoading] = useState(true)
    const [openInBrowser, setOpenInBrowser] = useState(false)

    const mainButtonMount = () => {
        setTimeout(tgToggleButton, 1000)

        if(Trainings.training.viewed) {
            tgButtonText("Прочитано")
            console.log('viewed')
        } else {
            tgButtonText("Завершить")
            console.log('not')
        }

        if(Trainings.training.next_article_in_new_section) {
            tgButtonText("Перейти к следующей теме")
        }

        tgMainButton.onClick(() => {
            if(Trainings.training.viewed) {
                navigate(`/trainings/${Trainings.training.next_article_id}`)
                console.log(navigate(`/trainings/${Trainings.training.next_article_id}`))
                console.log(Trainings.training.next_article_id)
            } else {
                const post = async() => {
                    tgButtonText("Завершается...")
                    await Trainings.readTraining(id)
                    tgButtonText("Прочитано")
                }

                post()
            }
        })
    }

    const mainButtonUnmount = () => {
        tgMainButton.hide()
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

        mainButtonMount()

        return () => {
            mainButtonUnmount()
        }
    }, [])

    return (
        <Wrapper>
            <Loader
                isLoading={isLoading}
            />

            <Navigation to="/trainings">
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

                    {Trainings.training.video_url &&
                        <video
                            controls
                            className="video"
                            disablePictureInPicture
                            controlsList="noplaybackrate nodownload"
                            src={Trainings.training.video_url}
                            poster={Trainings.training.video_preview_image}
                        />
                    }

                    {/*{openInBrowser &&*/}
                    {/*    <div className="go-to-browser">*/}
                    {/*        <Button onClick={browserRedirect} id="go-to-button">*/}
                    {/*            Перейти в браузер для просмотра урока*/}
                    {/*        </Button>*/}
                    {/*    </div>*/}
                    {/*}*/}
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

export default observer(TrainingDetail);