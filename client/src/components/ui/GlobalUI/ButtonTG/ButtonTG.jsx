import React, {useContext, useEffect, useState} from 'react';
import Text from "../Text/Text";
import {Link, useNavigate, useParams} from "react-router-dom";
import {Context} from "../../../../utils/context";
import {finishPendingStatus, finishStatus, viewedStatus} from "../../../../utils/consts";
import {haptic, tgButtonText, tgMainButton} from "../../../../utils/telegramAPI";

const ButtonTg = ({hide, setHide}) => {
    const id = useParams()
    const navigate = useNavigate()
    const {Trainings} = useContext(Context)

    const onClickHandler = async() => {
        haptic()

        if(!Trainings.training.viewed) {
            await Trainings.readTraining(id)

            if(Trainings.training.viewed && !Trainings.training.next_article_id) {
                setHide('hide')
            } else {
                setHide('')
            }
        }

        setTimeout(() => {
            navigate(0)
        }, 400)
    }

    const checkForHref = () => {
        if(Trainings.training.next_article_id) {
            return `/trainings/${Trainings.training.next_article_id}`
        } else {
            setHide('hide')
        }
    }

    useEffect(() => {
        if(Trainings.training.viewed && !Trainings.training.next_article_id) {
            setHide('hide')
        } else {
            setHide('')
        }
    }, [Trainings.training.viewed])

    useEffect(() => {
        if(!Trainings.training.next_article_id) {
            setHide('hide')
        }

        return () => {
            setHide('')
        }
    }, [])

    return (
        <Link
            className={`main-button ${hide}`}
            onClick={onClickHandler}
            to={checkForHref()}
        >
            <Text type="medium" overrideClass="main-button-text">
                {Trainings.training.viewed ? viewedStatus : finishStatus}
            </Text>
        </Link>
    );
};

export default ButtonTg;