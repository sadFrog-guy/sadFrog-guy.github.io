import React from 'react';
import Dragger from "../../ModalUI/Dragger/Dragger";
import ModalHeader from "../../ModalUI/ModalHeader/ModalHeader";
import LockIcon from "../../../icons/LockIcon/LockIcon";
import {tgWebApp} from "../../../../utils/consts";
import ModalText from "../../ModalUI/ModalText/ModalText";
import Modal from "../../ModalUI/Modal/Modal";
import {useContext} from "react";
import {Context} from "../../../../utils/context";

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
            <a
                href={Trainings.link}
                className="button-reusable modal-button"
            >
                Перейти к оплате
            </a>
        </Modal>
    );
};

export default TrainingModal;