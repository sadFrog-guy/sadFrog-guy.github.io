import {makeAutoObservable} from "mobx";
import Trainings from "../services/trainings";

export default new class StoreTrainings {

    trainings = []
    training = {}
    have_subscribe = false
    comment = ''
    link = ''

    constructor() {
        makeAutoObservable(this)
    }

    async getAllTrainings() {
        try {
            const {data} = await Trainings.getAllTrainings()
            console.log(data)
            this.trainings = data.sections
            this.have_subscribe = data.have_subscribe
        } catch (e) {
            console.log(e)
        }
    }

    async getOneTraining(id) {
        try {
            const {data} = await Trainings.getOneTraining(id.id);
            console.log(data)
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