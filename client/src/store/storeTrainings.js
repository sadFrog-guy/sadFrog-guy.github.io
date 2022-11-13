import {makeAutoObservable} from "mobx";
import Trainings from "../services/trainings";
import {tgID} from "../utils/telegramAPI";

export default new class StoreTrainings {

    trainings = []
    training = {}
    have_subscribe
    comment = ''
    link = ''
    video_link = ''

    constructor() {
        makeAutoObservable(this)
    }

    async getAllTrainings() {
        try {
            const {data} = await Trainings.getAllTrainings()
            console.log(data)
            this.trainings = data.sections
            this.have_subscribe = data.have_subscribe
            this.comment = data.comment
        } catch (e) {
            console.log(e)
        }
    }

    async getOneTraining(id) {
        try {
            const {data} = await Trainings.getOneTraining(id.id);
            console.log(data)
            this.training = data
            this.have_subscribe = data.have_subscribe
            this.comment = data.comment
        } catch (e) {
            console.log(e)
        }
    }

    async getAccessToVideo(id) {
        try {
            const {data} = await Trainings.getAccessToVideo(id.id)
            console.log(data)
            console.log(tgID)
            this.video_link = `https://crypto-learn.ru/watch_video/${tgID}/${id.id}/${data?.hash_code}`
        } catch (e) {
            console.log(e)
        }
    }

    async readTraining(id) {
        try {
            await Trainings.readTraining(id)
            const {data} = await Trainings.getOneTraining(id.id);

            this.training = data
        } catch (e) {
            console.log(e)
        }
    }

    checkAccess(training) {
        if(training.allowed_viewing === false) {
            this.comment = training.viewing_ban_comment
            this.link = training.viewing_pay_link
        }
    }
}