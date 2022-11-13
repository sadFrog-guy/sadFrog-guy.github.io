import {makeAutoObservable} from "mobx";
import Calculator from "../services/calculator";

export default new class StoreCalculator {

    chains = []
    amount = ''
    error
    have_subscribe

    constructor() {
        makeAutoObservable(this)
    }

    async getChains(amount) {
        try {
            const {data} = await Calculator.getChains(amount)
            console.log(data)
            this.chains = data.chains
            this.error = data.error
            this.have_subscribe = data.have_subscribe

            window.localStorage.setItem("comment-calculator", data.comment)
        } catch (e) {
            console.log(e)
        }
    }

    changeAmount(amount) {
        this.amount = amount
    }
}