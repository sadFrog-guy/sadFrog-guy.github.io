import React from 'react';
import Dragger from "../../ModalUI/Dragger/Dragger";
import ModalHeader from "../../ModalUI/ModalHeader/ModalHeader";
import LockIcon from "../../../icons/LockIcon/LockIcon";
import {haptic, tgWebApp, vibrationDuration} from "../../../../utils/telegramAPI";
import ModalText from "../../ModalUI/ModalText/ModalText";
import Modal from "../../ModalUI/Modal/Modal";
import {useContext} from "react";
import {Context} from "../../../../utils/context";
import Button from "../../GlobalUI/Button/Button";

const TrainingModal = ({modalActive, modalHide}) => {
    const {Trainings} = useContext(Context);

    return (
        <Modal isActive={modalActive} modalHide={modalHide}>
            <Dragger/>
            <span className="modal-header-wrap">
                    <ModalHeader>
                        Ошибка
                    </ModalHeader>
                    <LockIcon color={tgWebApp.colorScheme === 'dark' ? '#fff' : '#000'}/>
                </span>
            <ModalText>
                {Trainings.comment}
            </ModalText>
            <Button
                onClick={haptic}
                href={Trainings.link}
                className="button-reusable modal-button"
            >
                Перейти к оплате
            </Button>
        </Modal>
    );
};

export default TrainingModal;