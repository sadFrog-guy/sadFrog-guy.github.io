import React from 'react';
import {useContext, useEffect, useState} from 'react';
import Navigation from "../../components/ui/GlobalUI/Navigation/Navigation";
import Wrapper from "../../components/utils/Wrapper/Wrapper";
import TrainingList from "../../components/ui/TrainingUI/TrainingList/TrainingList";
import {Context} from "../../utils/context";
import TrainingItem from "../../components/ui/TrainingUI/TrainingItem/TrainingItem";
import {observer} from "mobx-react-lite";
import useModal from "../../hooks/useModal";
import Modal from "../../components/ui/ModalUI/Modal/Modal";
import Dragger from "../../components/ui/ModalUI/Dragger/Dragger";
import ModalHeader from "../../components/ui/ModalUI/ModalHeader/ModalHeader";
import LockIcon from "../../components/icons/LockIcon/LockIcon";
import ModalText from "../../components/ui/ModalUI/ModalText/ModalText";
import {Link, useNavigate, Navigate, useSearchParams} from "react-router-dom";
import Loader from "../../components/ui/GlobalUI/Loader/Loader";
import {backButtonShow, exitConfirmation, tgWebApp} from "../../utils/telegramAPI";
import TrainingModal from "../../components/ui/TrainingUI/TrainingModal/TrainingModal";
import {NOT_AUTH} from "../../router";

const Training = () => {
    const {Trainings} = useContext(Context);
    const {modalActive, modalHide, modalShow} = useModal()
    const navigate = useNavigate()
    const [isLoading, setLoading] = useState(true)
    const [isLoaded, setLoaded] = useState(false)

    useEffect(() => {
        exitConfirmation()

        backButtonShow(() => {
            navigate('/')
        })

        async function fetchData() {
            await Trainings.getAllTrainings()
        }
        fetchData()
    }, [])

    useEffect(() => {
        if(isLoaded) {
            setLoading(false)
        }
    }, [isLoaded])

    const [searchParams] = useSearchParams();

    console.log(searchParams);

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
                {Trainings?.trainings?.map(training => {
                    Trainings.checkAccess(training)

                    return (
                        <TrainingItem
                            id={training.id}
                            key={training.id}
                            trainingInfo={training}
                            imageOnLoad={() => setLoaded(true)}
                            subitemOnClick={modalShow}
                            onClick={training.allowed_viewing ? () => {} : modalShow}
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