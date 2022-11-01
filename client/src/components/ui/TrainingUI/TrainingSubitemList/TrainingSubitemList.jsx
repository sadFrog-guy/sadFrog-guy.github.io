import React from 'react';

const TrainingSubitemList = ({children, isShow}) => {
    const contentActiveClass = "training-content training-content_page active"
    const contentClass = "training-content training-content_page"

    return (
        <div className={isShow ? contentActiveClass : contentClass}>
            <div className="training-content-inner">
                <span className="medium training_medium">Уроки</span>
                <div className="training-lesson-wrap">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default TrainingSubitemList;