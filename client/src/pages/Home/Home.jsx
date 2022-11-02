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
import {tgInintial, tgWebApp} from "../../utils/consts";

const Home = () => {
    const {User, Theme} = useContext(Context);

    const {modalActive, modalHide, modalShow} = useModal()
    const {subscribtion, isSubscribtionStarter, subscribeTimer} = useTimeout()
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        tgInintial()

        async function fetchData() {
            await User.getUserInfo()
            subscribeTimer(User.subscribe_expire_datetime, User.subscription_name);
            setLoading(false)
        }
        fetchData()
    }, [])

    tgWebApp.onEvent('themeChanged', () => {
        if(tgWebApp.colorScheme === 'dark') {
            document.body.classList.remove("light")
            document.body.classList.add("dark")
        } else {
            document.body.classList.remove("dark")
            document.body.classList.add("light")
        }
    })

    return (
        <Wrapper>
            <Loader
                isLoading={isLoading}
            />

            <ModalHome
                modalActive={modalActive}
                modalHide={modalHide}
            />

            <WrapperHome>
                <HeaderHome/>

                <ButtonList
                    modalShow={modalShow}
                />

                <Subscribtion
                    isSubscribtionStarter={isSubscribtionStarter}
                    subscribtion={subscribtion}
                />

                <FooterHome/>
            </WrapperHome>
        </Wrapper>
    );
};

export default observer(Home);