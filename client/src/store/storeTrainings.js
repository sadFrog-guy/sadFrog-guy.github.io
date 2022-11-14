import {makeAutoObservable, runInAction} from "mobx";
import Trainings from "../services/trainings";
import {tgID} from "../utils/telegramAPI";

export default new class StoreTrainings {

    trainings = []
    training = {}
    have_subscribe
    link = ''
    video_link = ''

    constructor() {
        makeAutoObservable(this)
    }

    async getAllTrainings() {
        try {
            const {data} = await Trainings.getAllTrainings()
            console.log(data)

            runInAction(() => {
                this.trainings = data.sections
                this.have_subscribe = data.have_subscribe
            })

            window.localStorage.setItem("comment-training", data.comment ? data.comment : 'Неизвестная ошибка')
        } catch (e) {
            console.log(e)
        }
    }

    async getOneTraining(id) {
        try {
            const {data} = await Trainings.getOneTraining(id.id);
            console.log(data)

            runInAction(() => {
                this.training = data
                this.have_subscribe = data.have_subscribe
            })

            window.localStorage.setItem("comment-training", data.comment ? data.comment : 'Неизвестная ошибка')
        } catch (e) {
            console.log(e)
        }
    }

    async getAccessToVideo(id) {
        try {
            const {data} = await Trainings.getAccessToVideo(id.id)

            runInAction(() => {
                this.video_link = `https://crypto-learn.ru/watch_video/${tgID}/${id.id}/${data?.hash_code}`
            })
        } catch (e) {
            console.log(e)
        }
    }

    async readTraining(id) {
        try {
            await Trainings.readTraining(id)
            const {data} = await Trainings.getOneTraining(id.id);

            runInAction(() => {
                this.training = data
            })
        } catch (e) {
            console.log(e)
        }
    }

    checkAccess(training) {
        if(training.allowed_viewing === false) {

            runInAction(() => {
                this.comment = training.viewing_ban_comment
                this.link = training.viewing_pay_link
            })
        }
    }
}