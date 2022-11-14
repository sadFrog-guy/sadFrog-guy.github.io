import {makeAutoObservable, runInAction} from "mobx";
import Calculator from "../services/calculator";

export default new class StoreCalculator {

    chains = []
    amount = ''
    auto_update = false
    autoupdate_delay
    error
    have_subscribe

    constructor() {
        makeAutoObservable(this)
    }

    async getChains(amount) {
        try {
            const {data} = await Calculator.getChains(amount)
            console.log(data)

            runInAction(() => {
                this.chains = data.chains
                this.error = data.error
                this.have_subscribe = data.have_subscribe
                this.auto_update = data.autoupdate
                this.autoupdate_delay = data.autoupdate_delay
            })

            window.localStorage.setItem("comment-calculator", data.comment)
        } catch (e) {
            console.log(e)
        }
    }

    changeAmount(amount) {
        this.amount = amount
    }

    clearError() {
        this.error = ''
    }
}