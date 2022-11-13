import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../utils/context";
import {observer} from "mobx-react-lite";
import useModal from "../../hooks/useModal";
import useTimeout from "../../hooks/useTimeout";
import Wrapper from "../../components/utils/Wrapper/Wrapper";
import Loader from "../../components/ui/GlobalUI/Loader/Loader";
import WrapperHome from "../../components/utils/WrapperHome/WrapperHome";
import ButtonList from "../../components/ui/HomeUI/ButtonList/ButtonList";
import HeaderHome from "../../components/ui/HomeUI/HeaderHome/HeaderHome";
import Subscribtion from "../../components/ui/HomeUI/Subscribtion/Subscribtion";
import FooterHome from "../../components/ui/HomeUI/FooterHome/FooterHome";
import ModalHome from "../../components/ui/HomeUI/ModalHome/ModalHome";
import {backButtonHide, tgInintial, tgWebApp} from "../../utils/telegramAPI";
import {Navigate, useLocation, useNavigate, useParams} from "react-router-dom";
import {NOT_AUTH} from "../../router";

const Home = () => {
    const {User} = useContext(Context);

    const {modalActive, modalHide, modalShow} = useModal()
    const {subscribtion, isSubscribtionStarter, subscribeTimer} = useTimeout()
    const [isLoading, setLoading] = useState(true)
    const [isLoaded, setLoaded] = useState(false)

    console.log(tgWebApp.initData)

    useEffect(() => {
        tgInintial()

        backButtonHide()

        async function fetchData() {
            await User.getUserInfo()
            subscribeTimer(User.subscribe_expire_datetime, User.subscription_name);

            if(isLoaded) {
                setLoading(false)
            }
        }

        fetchData()
    }, [isLoaded])

    return (
        <Wrapper>
            <WrapperHome>
                <ModalHome
                    modalActive={modalActive}
                    modalHide={modalHide}
                />

                <HeaderHome avatarOnLoad={() => setLoaded(true)} />

                <ButtonList
                    modalShow={modalShow}
                />

                <Subscribtion
                    isSubscribtionStarter={isSubscribtionStarter}
                    subscribtion={subscribtion}
                />

                <FooterHome/>
            </WrapperHome>

            <Loader
                isLoading={isLoading}
            />

            {User.have_subscribe === false && <Navigate to={NOT_AUTH}/>}
        </Wrapper>
    );
};

export default observer(Home);