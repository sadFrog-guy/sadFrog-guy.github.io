import {makeAutoObservable, runInAction} from "mobx";
import Referal from "../services/referal";

export default new class StoreReferal {

    referalBalance = 0
    referalLink = ''
    have_subscribe

    constructor() {
        makeAutoObservable(this)
    }

    async getReferalInfo() {
        try {
            const {data} = await Referal.getReferalInfo()

            runInAction(() => {
                this.referalBalance = data.referal_balance
                this.referalLink = data.referal_link
                this.have_subscribe = data.have_subscribe
            })

            window.localStorage.setItem("comment-referal", data.comment ? data.comment : 'Неизвестная ошибка')
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