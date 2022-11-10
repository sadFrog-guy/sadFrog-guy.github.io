import {makeAutoObservable} from "mobx";
import Calculator from "../services/calculator";

export default new class StoreCalculator {

    chains = []
    amount = 1000

    constructor() {
        makeAutoObservable(this)
    }

    async getChains(amount) {
        try {
            const {data} = await Calculator.getChains(amount)
            console.log(data)
            this.chains = data
        } catch (e) {
            console.log(e)
        }
    }

    changeAmount(amount) {
        this.amount = amount
    }
}