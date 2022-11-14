import {makeAutoObservable} from "mobx";
import Security from "../services/security";
import {tgInitData} from "../utils/telegramAPI";

export default new class StoreSecurity {

    success

    constructor() {
        makeAutoObservable(this)
    }

    async postHashKey() {
        try {
            const {data} = await Security.postHashKey()
            console.log(data)

            this.success = data.success
        } catch (e) {
            console.log(e)
        }
    }
}