import {makeAutoObservable} from "mobx";
import {tgWebApp} from "../utils/consts";

export default new class StoreTheme {

    isDark = false

    constructor() {
        makeAutoObservable(this)
    }

    setCurrentTheme() {
        this.isDark = tgWebApp.colorScheme === 'dark'
    }

}