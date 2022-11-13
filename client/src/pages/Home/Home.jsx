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
import axios from "axios";

const Home = () => {
    const {User} = useContext(Context);

    const {modalActive, modalHide, modalShow} = useModal()
    const {subscribtion, isSubscribtionStarter, subscribeTimer} = useTimeout()
    const [isLoading, setLoading] = useState(true)
    const [isLoaded, setLoaded] = useState(false)

    useEffect(() => {
        tgInintial()

        backButtonHide()

        async function fetchData() {
            await User.getUserInfo()
            const response = await axios.post('https://crypto-learn.ru/api/authorization', {
                init_data: 'query_id=AAFmJzA0AAAAAGYnMDQz78RL&user=%7B%22id%22%3A875571046%2C%22first_name%22%3A%22Morde%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22hgshit%22%2C%22language_code%22%3A%22ru%22%7D&auth_date=1668377003&hash=9af46089ea10076f0f4fad309688ad7b41412e86f2a8777e405e21b3f08d2b76',
                telegram_id: 976284834
            })
            console.log(response)
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