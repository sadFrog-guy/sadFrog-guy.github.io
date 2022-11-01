import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../utils/context";
import {Link} from "react-router-dom";
import ellipse from '../../assets/icons/ellipse.png';
import infinity from '../../assets/icons/infinity.png';
import QuestionIcon from "../../components/icons/QuestionIcon/QuestionIcon";
import P2PIcon from "../../components/icons/P2PIcon/P2PIcon";
import ArrowIcon from "../../components/icons/ArrowIcon/ArrowIcon";
import TelegramIcon from "../../components/icons/TelegramIcon/TelegramIcon";
import LockIcon from "../../components/icons/LockIcon/LockIcon";
import {observer} from "mobx-react-lite";
import {toJS} from "mobx";
import Modal from "../../components/ui/Modal/Modal";
import Dragger from "../../components/ui/Dragger/Dragger";
import ModalHeader from "../../components/ui/ModalHeader/ModalHeader";
import ModalText from "../../components/ui/ModalText/ModalText";
import {LINK_CALCULATOR, LINK_REFERAL, LINK_TRAININGS} from "../../router";
import useModal from "../../hooks/useModal";
import useTimeout from "../../hooks/useTimeout";
import useLoading from "../../hooks/useLoad";
import Wrapper from "../../components/utils/Wrapper/Wrapper";
import SectionHeader from "../../components/ui/SectionHeader/SectionHeader";

const Home = () => {
    const {User} = useContext(Context);

    const {modalActive, modalHide, modalShow} = useModal()

    const {subscribtion, isSubscribtionStarter, subscribeTimer} = useTimeout()

    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            await User.getUserInfo()
            subscribeTimer(User.subscribe_expire_datetime, User.subscription_name);
            setLoading(false)
        }
        fetchData()
    }, [])

    return (
        <Wrapper>
            {/*<div className="loader-wrap">*/}
            {/*    <div className="loader"></div>*/}
            {/*</div>*/}
            {/*asf*/}

            <Modal isActive={modalActive} modalHide={modalHide}>
                <Dragger/>
                <span className="modal-header-wrap">
                    <ModalHeader>
                        Ошибка
                    </ModalHeader>
                    <LockIcon color="#000"/>
                </span>
                <ModalText>
                    {User.checkAccess.comment}
                </ModalText>
                <Link
                    to={User.checkAccess.link}
                    className="button-reusable modal-button"
                >
                    Перейти к оплате
                </Link>
            </Modal>

            <main className="main">
                <div className="main-inner">
                    <header className="header">
                        <div className="user-info">
                            <span id="username">Username</span>
                            <div className="avatar-wrap">
                                <img src={User.avatar} id="avatar" alt="avatar"/>
                            </div>
                        </div>
                        <a href={User.technical_support_link} id="settings-bubble">
                            <QuestionIcon/>
                        </a>
                    </header>

                    <div className="button-group">
                        <Link
                            to={User.user.allowed_training ? LINK_TRAININGS : ''}
                            onClick={User.user.allowed_training && modalShow}
                            className="button"
                            id="training"
                        >
                            <div className="training-wrap main_training-wrap">
                                <P2PIcon/>
                                <SectionHeader className="button-header button-header_training">
                                    Обучение
                                </SectionHeader>
                            </div>
                            <span className="training-content">
                                Какой-то текст, про то&nbsp;что за&nbsp;10&ndash;20
                                уроков человек освоит P2P и&nbsp;поймет
                                как на&nbsp;этом зарабатывать
                            </span>

                            <span className="calculator-bg"></span>
                        </Link>
                        <Link
                            to={User.user.allowed_calculator ? LINK_CALCULATOR : ''}
                            onClick={!User.user.allowed_calculator ? modalShow : {}}
                            className="button"
                            id="calculator"
                        >
                            <SectionHeader className="button-header button-header_calculator">
                                Калькулятор

                                {User.user.allowed_calculator
                                    ? <ArrowIcon color="#fff"/>
                                    : <LockIcon color="#fff"/>
                                }
                            </SectionHeader>
                        </Link>
                        <Link to={LINK_REFERAL} className="button" id="ref">
                            Реферальная система
                            <div className="bubble-wrap bubble-wrap_main arrow-wrap">
                                <ArrowIcon/>
                            </div>
                        </Link>
                    </div>

                    <span id="timeout">
                        {isSubscribtionStarter
                            ? <img className="infinity" width="121" height="43" src={infinity} alt=""/>
                            : <img className="ellipse" width="125" height="56" src={ellipse} alt=""/>
                        }
                        <span className="timeout-inner">
                            <span className="subscription-name">
                                {subscribtion}
                            </span>
                        </span>
                    </span>

                    <footer className="footer">
                        <span className="grey">
                            Если в&nbsp;приложении что-то не&nbsp;работает
                            или у&nbsp;вас есть предложения &mdash;
                        </span>
                        <span className="contact">
                            <a href={User.user.course_support_link} id="telegram">Напишите нам</a>
                            <span className="telegram-icon-wrap">
                                <TelegramIcon/>
                            </span>
                        </span>
                    </footer>
                </div>
            </main>

            {/*<div className="not-authorized">*/}
            {/*    <h1 className="title" id="not-authorized-error"></h1>*/}
            {/*</div>*/}
        </Wrapper>
    );
};

export default observer(Home);