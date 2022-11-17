import React, {useContext} from 'react';
import {useParams} from "react-router-dom";
import Navigation from "../../components/ui/GlobalUI/Navigation/Navigation";
import Wrapper from "../../components/utils/Wrapper/Wrapper";
import Wrap from "../../components/utils/Wrap/Wrap";
import {Context} from "../../utils/context";

const TrainingFrame = () => {
    const {id} = useParams()
    const {Trainings} = useContext(Context)

    return (
        <Wrapper>
            <Wrap className="article">
                <Navigation to="/trainings">
                    Обучение
                </Navigation>

                <iframe
                    frameborder="0"
                    className="iframe-wrap"
                    height="150%"
                    width="100%"
                    src={`https://${window.location.hostname}/trainings/frame/${id}`}
                />
            </Wrap>
        </Wrapper>
    );
};

export default TrainingFrame;