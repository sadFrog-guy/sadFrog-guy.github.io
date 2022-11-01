import {makeAutoObservable} from "mobx";
import Referal from "../services/referal";

export default new class StoreReferal {

    referalBalance = 0
    referalLink = ''
    success = false

    constructor() {
        makeAutoObservable(this)
    }

    async getReferalInfo() {
        try {
            const {data} = await Referal.getReferalInfo()
            console.log(data)
            this.referalBalance = data.referal_balance
            this.referalLink = data.referal_link
            this.success = data.success
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