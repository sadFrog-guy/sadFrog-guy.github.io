import {makeAutoObservable} from "mobx";
import User from "../services/user";
import Trainings from "../services/trainings";

export default new class StoreTrainings {

    trainings = []
    have_subscribe = false

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

}