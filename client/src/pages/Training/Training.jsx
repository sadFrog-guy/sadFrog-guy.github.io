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
import {Link, useNavigate} from "react-router-dom";
import Loader from "../../components/ui/GlobalUI/Loader/Loader";

const Training = () => {
    const {Trainings} = useContext(Context);

    const {modalActive, modalHide, modalShow} = useModal()

    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            await Trainings.getAllTrainings()
            setLoading(false)
        }
        fetchData()
    }, [])

    return (
        <Wrapper>
            <Loader
                isLoading={isLoading}
            />

            <Modal isActive={modalActive} modalHide={modalHide}>
                <Dragger/>
                <span className="modal-header-wrap">
                    <ModalHeader>
                        Ошибка
                    </ModalHeader>
                    <LockIcon color="#000"/>
                </span>
                <ModalText>
                    {Trainings.comment}
                </ModalText>
                <a
                    href={Trainings.link}
                    className="button-reusable modal-button"
                >
                    Перейти к оплате
                </a>
            </Modal>

            <Navigation>
                Обучение
            </Navigation>

            <TrainingList title="Обучение">
                {Trainings.trainings.map(training => {
                    Trainings.checkAccess(training)

                    return (
                        <TrainingItem
                            id={training.id}
                            key={training.id}
                            trainingInfo={training}
                            onClick={training.allowed_viewing ? () => {} : modalShow}
                        />
                    )
                })}
            </TrainingList>
        </Wrapper>
    );
};

export default observer(Training);