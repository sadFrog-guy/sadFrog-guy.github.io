import React from 'react';
import {useParams} from "react-router-dom";
import Navigation from "../../components/ui/GlobalUI/Navigation/Navigation";
import Wrapper from "../../components/utils/Wrapper/Wrapper";
import Wrap from "../../components/utils/Wrap/Wrap";

const TrainingFrame = () => {
    const {id} = useParams()

    return (
        <Wrapper>
            <Wrap className="article">
                <Navigation to="/trainings">
                    Обучение
                </Navigation>

                <iframe src={`https://${window.location.hostname}/trainings/frame/${id.id}`}/>
            </Wrap>
        </Wrapper>
    );
};

export default TrainingFrame;