import React, {useContext} from 'react';
import {useParams} from "react-router-dom";
import Navigation from "../../components/ui/GlobalUI/Navigation/Navigation";
import Wrapper from "../../components/utils/Wrapper/Wrapper";
import Wrap from "../../components/utils/Wrap/Wrap";
import {Context} from "../../utils/context";

const TrainingFrame = () => {
    const {id} = useParams()
    const {Trainings} = useContext(Context)

    Trainings.getOneTraining(id)

    return (
        <Wrapper>
            <Wrap className="article">
                <Navigation to="/trainings">
                    Обучение
                </Navigation>

                {/*<iframe src={`https://${window.location.hostname}/trainings/frame/${id.id}`}/>*/}
            </Wrap>
        </Wrapper>
    );
};

export default TrainingFrame;