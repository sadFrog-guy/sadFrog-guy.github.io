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
    isFirstLoad = true
    isAvatarLoaded = false

    constructor() {
        makeAutoObservable(this)
    }

    async getUserInfo() {
        try {
            const {data} = await User.getUser()
            console.log(data)

            runInAction(() => {
                this.user = data
                this.username = tgUser?.first_name
                this.subscribe_expire_datetime = data.subscribe_expire_datetime
                this.subscription_name = data.subscription_name
                this.technical_support_link = data.technical_support_link
                this.course_support_link = data.course_support_link
                this.avatar = data.avatar
                this.have_subscribe = data.have_subscribe
                this.training_comment = data.ban_training_comment
                this.training_link = data.pay_training_link
                this.calculator_comment = data.ban_calculator_comment
                this.calculator_link = data.pay_calculator_link
                this.error = data.comment
            })
        } catch (e) {
            console.log(e)
        }
    }

    setErrorType(type) {
        this.error_type = type
    }

    setFirstLoad(boolean) {
        this.isFirstLoad = boolean
    }

    setAvatarLoaded(boolean) {
        this.isAvatarLoaded = boolean
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
