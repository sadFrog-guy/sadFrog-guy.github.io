import {haptic, tgButtonInitial, tgButtonText, tgMainButton} from "../utils/telegramAPI";

export const useTelegramButton = () => (Trainings, trainingId, navigateFoo) => {
    const viewedStatus = "Прочитано"
    const finishStatus = "Завершить"
    const finishPendingStatus = "Завершается..."

    if(window.location.pathname.includes("/trainings/")) {
        tgButtonInitial()

        const onClickHandler = async() => {
            haptic()

            if(Trainings.training.viewed) {
                navigateFoo()
            } else {
                tgButtonText(finishPendingStatus)

                await Trainings.readTraining(trainingId)

                if(Trainings.training.viewed && !Trainings.training.next_article_id) {
                    tgMainButton.hide()
                } else {
                    navigateFoo()
                }
            }
        }

        tgMainButton.onClick(onClickHandler)

        if(Trainings.training.viewed) {
            tgButtonText(viewedStatus)
        } else {
            tgButtonText(finishStatus)
        }

        if(Trainings.training.viewed && !Trainings.training.next_article_id) {
            tgMainButton.hide()
        } else {
            tgMainButton.show()
        }
    }
}