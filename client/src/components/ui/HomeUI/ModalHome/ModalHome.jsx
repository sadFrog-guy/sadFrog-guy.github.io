import React from 'react';
import Dragger from "../../ModalUI/Dragger/Dragger";
import Text from "../../GlobalUI/Text/Text";
import ModalHeader from "../../ModalUI/ModalHeader/ModalHeader";
import LockIcon from "../../../icons/LockIcon/LockIcon";
import ModalText from "../../ModalUI/ModalText/ModalText";
import {Link} from "react-router-dom";
import Modal from "../../ModalUI/Modal/Modal";
import {useContext} from "react";
import {Context} from "../../../../utils/context";
import {haptic, tgWebApp, vibrationDuration} from "../../../../utils/consts";
import Button from "../../GlobalUI/Button/Button";

const ModalHome = ({modalActive, modalHide}) => {
    const {User} = useContext(Context);

    return (
        <Modal isActive={modalActive} modalHide={modalHide}>
            <Dragger/>
            <Text type="medium" className="modal-header-wrap">
                <ModalHeader>
                    Ошибка
                </ModalHeader>
                <LockIcon color={tgWebApp.colorScheme === 'dark' ? '#fff' : '#000'}/>
            </Text>
            <ModalText>
                {User.checkAccess.comment}
            </ModalText>
            <Button
                href={User.checkAccess.link}
                className="button-reusable modal-button"
                onClick={haptic}
            >
                Перейти к оплате
            </Button>
        </Modal>
    );
};

export default ModalHome;