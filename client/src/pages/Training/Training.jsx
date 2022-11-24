import React from 'react';
import {useContext, useEffect, useState} from 'react';
import Navigation from "../../components/ui/GlobalUI/Navigation/Navigation";
import Wrapper from "../../components/utils/Wrapper/Wrapper";
import TrainingList from "../../components/ui/TrainingUI/TrainingList/TrainingList";
import {Context} from "../../utils/context";
import TrainingItem from "../../components/ui/TrainingUI/TrainingItem/TrainingItem";
import {observer} from "mobx-react-lite";
import useModal from "../../hooks/useModal";
import {Link, useNavigate, Navigate, useSearchParams, useLocation} from "react-router-dom";
import Loader from "../../components/ui/GlobalUI/Loader/Loader";
import {backButtonHide, backButtonShow, exitConfirmation, tgWebApp} from "../../utils/telegramAPI";
import TrainingModal from "../../components/ui/TrainingUI/TrainingModal/TrainingModal";
import {NOT_AUTH} from "../../router";

const Training = () => {
    const {Trainings} = useContext(Context);
    const {modalActive, modalHide, modalShow} = useModal()
    const navigate = useNavigate()
    const [isLoading, setLoading] = useState(true)
    const [isImagesLoaded, setImagesLoaded] = useState(false)
    const [images, setImages] = useState({})

    // useEffect(() => {
    //     const loadImage = image => {
    //         return new Promise((resolve, reject) => {
    //             const loadImg = new Image()
    //             loadImg.src = image
    //             loadImg.onload = () =>
    //                 resolve(image)
    //
    //             loadImg.onerror = err => reject(err)
    //         })
    //     }
    //
    //     Promise.all(Trainings.imagesArray.map(image => loadImage(image)))
    //         .then(() => setImagesLoaded(true))
    //         .catch(err => console.log("Failed to load images", err))
    // }, [])

    function loadImages(files) {
        let i = 0
        let filesLoading = files.length;
        const onload = () => --filesLoading === 0 && setImagesLoaded(true);
        const images = {};
        while (i < files.length) {
            const img = images[files[i]] = new Image;
            img.src = files[i++];
            img.onload = onload;
        }

        setImages(images)
    }

    useEffect(() => {
        exitConfirmation()

        backButtonShow(() => {
            navigate('/')
        })

        async function fetchData() {
            await Trainings.getAllTrainings()
            loadImages(Trainings.imagesArray)
            console.log(images)
            Trainings.setImagesArray()
        }
        fetchData()

        return () => {
            backButtonHide()
        }
    }, [])

    useEffect(() => {
        if(isImagesLoaded) {
            setLoading(false)
        }
    }, [isImagesLoaded])

    const itemHandleClick = (training) => {
        Trainings.setErrorType(training)

        if(!training.allowed_viewing) {
            modalShow()
        }
    }

    return (
        <Wrapper>
            <TrainingModal
                modalHide={modalHide}
                modalActive={modalActive}
            />

            <Navigation to="/">
                Обучение
            </Navigation>

            <TrainingList title="Обучение">
                {Trainings?.trainings?.map((training, index) => {
                    return (
                        <TrainingItem
                            id={training.id}
                            key={training.id}
                            // image={}
                            trainingInfo={training}
                            onClick={() => itemHandleClick(training)}
                            modalShow={modalShow}
                        />
                    )
                })}
            </TrainingList>

            <Loader
                isLoading={isLoading}
            />

            {Trainings.have_subscribe === false && <Navigate to={NOT_AUTH}/>}
        </Wrapper>
    );
};

export default observer(Training);