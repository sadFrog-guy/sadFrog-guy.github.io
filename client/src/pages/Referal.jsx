import React from 'react';
import Wrapper from "../components/utils/Wrapper/Wrapper";
import Header from "../components/ui/Header/Header";
import {useContext, useEffect, useState} from "react";
import {Context} from "../utils/context";
import useModal from "../hooks/useModal";
import {useNavigate} from "react-router-dom";
import {toJS} from "mobx";
import lines from '../assets/images/lines.png';
import CopyIcon from "../components/icons/CopyIcon/CopyIcon";
import {CopyToClipboard} from "react-copy-to-clipboard/src";
import Copied from "../components/ui/Copied/Copied";
import CopyButton from "../components/ui/CopyButton/CopyButton";
import WrapperReferal from "../components/utils/WrapperReferal/WrapperReferal";
import ReferalBalance from "../components/ui/ReferalBalance/ReferalBalance";
import Wrap from "../components/utils/Wrap/Wrap";
import ReferalDescription from "../components/ui/ReferalDescription/ReferalDescription";
import Text from "../components/ui/Text/Text";
import Button from "../components/ui/Button/Button";
import {useCopy} from "../hooks/useCopy";

const Referal = () => {

    const {Referal} = useContext(Context);

    const {modalActive, modalHide, modalShow} = useModal()
    const {copied, onCopyHandler} = useCopy()
    const navigate = useNavigate()

    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            await Referal.getReferalInfo()
            setLoading(false)
        }
        fetchData()
    }, [])

    return (
        <Wrapper>
            <Header backButtonOnClick={() => navigate(-1)}>
                Обучение
            </Header>
            <WrapperReferal>
                <Wrap className="content">
                    <ReferalBalance
                        balance={Referal.referalBalance}
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

                        <Text type="medium" id="referal-link">
                            {Referal.referalLink}
                        </Text>

                        <CopyIcon/>
                    </CopyButton>
                    <Button id="share-button">
                        <span className="share-system">
                            Поделиться ссылкой
                        </span>
                    </Button>
                </Wrap>
            </WrapperReferal>
        </Wrapper>
    );
};

export default Referal;