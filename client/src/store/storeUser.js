import {makeAutoObservable} from "mobx";
import User from "../services/user";
import {tgUser} from "../utils/telegramAPI";

export default new class StoreUser {

    user = {}
    allowed_training = false
    allowed_calculator = false
    subscribe_expire_datetime
    subscription_name
    technical_support_link
    avatar
    username
    have_subscribe

    constructor() {
        makeAutoObservable(this)
    }

    async getUserInfo() {
        try {
            const {data} = await User.getUser()
            console.log(data)
            this.user = data
            this.username = tgUser?.first_name
            this.subscribe_expire_datetime = data.subscribe_expire_datetime
            this.subscription_name = data.subscription_name
            this.technical_support_link = data.technical_support_link
            this.avatar = data.avatar
            this.have_subscribe = data.have_subscribe

            window.localStorage.setItem("comment-user", data.comment)
        } catch (e) {
            console.log(e)
        }
    }

    get checkAccess() {
        if (this.allowed_training === false && this.allowed_calculator === true) {
            return {
                comment: this.user.ban_training_comment,
                link: this.user.pay_training_link
            }
        }
        else {
            return {
                comment: this.user.ban_calculator_comment,
                link: this.user.pay_calculator_link
            }
        }
    }
}
