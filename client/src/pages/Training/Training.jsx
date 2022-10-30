import React from 'react';
import {useContext, useEffect, useState} from 'react';
import Header from "../../components/ui/Header/Header";
import Wrapper from "../../components/utils/Wrapper/Wrapper";
import TrainingList from "../../components/ui/TrainingList/TrainingList";
import {Context} from "../../utils/context";
import TrainingItem from "../../components/ui/TrainingItem/TrainingItem";
import {observer} from "mobx-react-lite";
import useModal from "../../hooks/useModal";
import Modal from "../../components/ui/Modal/Modal";
import Dragger from "../../components/ui/Dragger/Dragger";
import ModalHeader from "../../components/ui/ModalHeader/ModalHeader";
import LockIcon from "../../components/icons/LockIcon/LockIcon";
import ModalText from "../../components/ui/ModalText/ModalText";
import {Link} from "react-router-dom";

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
            <Modal isActive={modalActive} modalHide={modalHide}>
                <Dragger/>
                <span className="modal-header-wrap">
                    <ModalHeader>
                        Ошибка
                    </ModalHeader>
                    <LockIcon color="#000"/>
                </span>
                <ModalText>

                </ModalText>
                <Link
                    to=""
                    className="button-reusable modal-button"
                >
                    Перейти к оплате
                </Link>
            </Modal>

            <Header>
                Обучение
            </Header>

            <TrainingList title="Обучение">
                {Trainings.trainings.map(training => {
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