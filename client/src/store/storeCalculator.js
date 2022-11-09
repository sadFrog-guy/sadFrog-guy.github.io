import {makeAutoObservable} from "mobx";
import Calculator from "../services/calculator";

export default new class StoreCalculator {

    chains = []

    constructor() {
        makeAutoObservable(this)
    }

    async getChains(chains) {
        try {
            const {data} = await Calculator.getChains(chains)
            console.log(data)
            this.chains = data
        } catch (e) {
            console.log(e)
        }
    }
}