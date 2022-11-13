import React from 'react';
import Wrapper from "../components/utils/Wrapper/Wrapper";
import Navigation from "../components/ui/GlobalUI/Navigation/Navigation";
import {useContext, useEffect, useState} from "react";
import {Context} from "../utils/context";
import useModal from "../hooks/useModal";
import {Navigate, useNavigate} from "react-router-dom";
import {toJS} from "mobx";
import lines from '../assets/images/lines.png';
import CopyIcon from "../components/icons/CopyIcon/CopyIcon";
import {CopyToClipboard} from "react-copy-to-clipboard/src";
import Copied from "../components/ui/ReferalUI/Copied/Copied";
import CopyButton from "../components/ui/ReferalUI/CopyButton/CopyButton";
import WrapperReferal from "../components/utils/WrapperReferal/WrapperReferal";
import ReferalBalance from "../components/ui/ReferalUI/ReferalBalance/ReferalBalance";
import Wrap from "../components/utils/Wrap/Wrap";
import ReferalDescription from "../components/ui/ReferalUI/ReferalDescription/ReferalDescription";
import Text from "../components/ui/GlobalUI/Text/Text";
import Button from "../components/ui/GlobalUI/Button/Button";
import {useCopy} from "../hooks/useCopy";
import Loader from "../components/ui/GlobalUI/Loader/Loader";
import {isIOS} from "../utils/isIOS";
import {backButtonShow, exitConfirmation, haptic, tgWebApp} from "../utils/telegramAPI";
import {NOT_AUTH} from "../router";

const Referal = () => {

    const {Referal} = useContext(Context);

    const navigate = useNavigate()
    const {copied, onCopyHandler} = useCopy()
    const {modalActive, modalHide, modalShow} = useModal()
    const [isLoading, setLoading] = useState(true)

    const shareData = {
        text: `Вот здесь я научился P2P`,
        link: Referal.referalLink
    }

    useEffect(() => {
        exitConfirmation()

        backButtonShow(() => {
            navigate('/')
        })

        async function fetchData() {
            await Referal.getReferalInfo()
            setLoading(false)
        }
        fetchData()
    }, [])

    const onShare = async() => {
        haptic()
        await navigator.share({ url: shareData.link, text: shareData.text, title: '' })
    }

    const onShareTg = () => {
        haptic()
        window.location.href = `
            https://telegram.me/share/url?url=${shareData.link}&text=${shareData.text}
        `
    }

    return (
        <Wrapper>
            <WrapperReferal>
                <Navigation>
                    Обучение
                </Navigation>

                <Wrap className="content">
                    <ReferalBalance
                        balance={Referal.referalBalance + ' ₽'}
                        title="Баланс"
                    />
                    <ReferalDescription
                        header="Это ваша реферальная ссылка"
                    >
                        Реферальная ссылка&nbsp;&mdash; специальный URL,
                        с&nbsp;помощью которого участник партнёрской
                        программы рекламирует продукт
                        и&nbsp;получает за&nbsp;это вознаграждение
                    </ReferalDescription>
                </Wrap>
                <Wrap className="share-wrap">
                    <CopyButton onCopy={onCopyHandler} text={Referal.referalLink}>
                        <Copied isCopied={copied}>Скопировано</Copied>

                        <Text onClick={haptic} type="medium" id="referal-link">
                            {Referal.referalLink}
                        </Text>

                        <CopyIcon/>
                    </CopyButton>
                    {/*{isIOS()*/}
                    {/*    ?*/}
                        <Button id="share-button" onClick={onShare}>
                            Поделиться
                        </Button>
                    {/*    :*/}
                    {/*    <Button id="share-button" onClick={onShareTg}>*/}
                    {/*        Поделиться в Telegram*/}
                    {/*    </Button>*/}
                    {/*}*/}

                </Wrap>
            </WrapperReferal>

            <Loader
                isLoading={isLoading}
            />

            {Referal.have_subscribe === false && <Navigate to={NOT_AUTH}/>}
        </Wrapper>
    );
};

export default Referal;