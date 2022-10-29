import React from 'react';
import Header from "../../components/ui/Header/Header";
import Wrapper from "../../components/utils/Wrapper/Wrapper";
import P2PIcon from "../../components/icons/P2PIcon/P2PIcon";
import TrainingList from "../../components/ui/TrainingList/TrainingList";
import {useContext, useEffect, useState} from "@types/react";
import {Context} from "../../utils/context";
import TrainingItem from "../../components/ui/TrainingItem/TrainingItem";

const Training = () => {
    const {Trainings} = useContext(Context);

    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            await Trainings.getAllTrainings()
            setLoading(false)
        }
        fetchData()
    }, [])

    if(Trainings.have_subscribe) {
        return (
            <Wrapper>
                <Header>
                    Обучение
                </Header>

                <TrainingList title="Обучение">
                    {Trainings.trainings.map(training => {
                        return (
                            <TrainingItem
                                title={training.title}
                                description={training.short_description}
                                imageUrl={training.image_url}
                                isAllowed={training.allowed_viewing}
                                viewed={training.viewed}
                            />
                        )
                    })}
                </TrainingList>
            </Wrapper>
        );
    }
};

export default Training;