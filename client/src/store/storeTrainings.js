import {makeAutoObservable, runInAction, toJS} from "mobx";
import Trainings from "../services/trainings";
import {tgID} from "../utils/telegramAPI";
import parse from "html-react-parser";

export default new class StoreTrainings {

    trainings = []
    training = {}
    bold_text = ''
    main_text = ''
    have_subscribe
    comment = ''
    link = ''
    video_link = ''
    imagesArray = []
    error = ''
    counter = 0

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

            this.error = data.comment
        } catch (e) {
            console.log(e)
        }
    }

    async getOneTraining(id) {
        try {
            const {data} = await Trainings.getOneTraining(id);
            console.log(data)

            runInAction(() => {
                this.training = data
                this.have_subscribe = data.have_subscribe
                this.bold_text = data.bold_text
                this.main_text = parse(data.main_text)
                this.error = data.comment
            })
        } catch (e) {
            console.log(e)
        }
    }

    async getAccessToVideo(id) {
        try {
            const {data} = await Trainings.getAccessToVideo(id)

            runInAction(() => {
                this.video_link = `https://crypto-learn.ru/watch_video/${tgID}/${id}/${data?.hash_code}`
            })
        } catch (e) {
            console.log(e)
        }
    }

    async readTraining(id) {
        try {
            await Trainings.readTraining(id)
            const {data} = await Trainings.getOneTraining(id);

            runInAction(() => {
                this.training = data
            })
        } catch (e) {
            console.log(e)
        }
    }

    setErrorType(training) {
        console.log(toJS(training))
        if(training.viewing_ban_comment && training.viewing_pay_link) {
            this.comment = training.viewing_ban_comment
            this.link = training.viewing_pay_link
        } else {
            this.comment = ''
            this.link = ''
        }
    }

    setImagesArray() {
        try {
            this.trainings.forEach(training => {
                this.imagesArray.push(training.image_url)
            })
        } catch (e) {
            console.log(e)
        }
    }

    setCounter() {
        this.counter += 1
    }
}