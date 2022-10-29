import React from 'react';

const TrainingSubitem = ({children}) => {
    return (
        <div className="training-content training-content_page">
            <div className="training-content-inner">
                <span className="medium training_medium">Уроки</span>
                <div className="training-lesson-wrap">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default TrainingSubitem;