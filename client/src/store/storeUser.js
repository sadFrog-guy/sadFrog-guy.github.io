import {makeAutoObservable, runInAction} from "mobx";
import User from "../services/user";
import {tgHash, tgID, tgUser} from "../utils/telegramAPI";

export default new class StoreUser {

    user = {}
    allowed_training = false
    allowed_calculator = false
    subscribe_expire_datetime
    subscription_name
    technical_support_link
    course_support_link
    avatar
    username
    have_subscribe
    calculator_comment
    calculator_link
    training_comment
    training_link
    error_type = 'training'
    error

    constructor() {
        makeAutoObservable(this)
    }

    async getUserInfo() {
        try {
            const {data} = await User.getUser()
            window.localStorage.setItem("user", JSON.stringify(data))
            const user = JSON.parse(window.localStorage.getItem("user"))
            console.log(user)

            runInAction(() => {
                this.user = user
                this.username = tgUser?.first_name
                this.subscribe_expire_datetime = user.subscribe_expire_datetime
                this.subscription_name = user.subscription_name
                this.technical_support_link = user.technical_support_link
                this.course_support_link = user.course_support_link
                this.avatar = user.avatar
                this.have_subscribe = user.have_subscribe
                this.training_comment = user.ban_training_comment
                this.training_link = user.pay_training_link
                this.calculator_comment = user.ban_calculator_comment
                this.calculator_link = user.pay_calculator_link
                this.error = user.comment
            })
        } catch (e) {
            console.log(e)
        }
    }

    setErrorType(type) {
        this.error_type = type
    }

    get checkAccess() {
        if(this.error_type === 'training') {
            return {
                comment: this.training_comment,
                link: this.training_link,
            }
        } else {
            return {
                comment: this.calculator_comment,
                link: this.calculator_link,
            }
        }
    }
}
