import {makeAutoObservable} from "mobx";
import Security from "../services/security";
import {tgHash} from "../utils/telegramAPI";

export default new class StoreSecurity {

    success

    constructor() {
        makeAutoObservable(this)
    }

    async postHashKey() {
        try {
            const {data} = await Security.postHashKey()

            this.success = data.success
        } catch (e) {
            console.log(e)
        }
    }
}