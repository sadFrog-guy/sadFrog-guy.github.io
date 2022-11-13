import {request} from "../utils/axiosInstance";
import {tgHash, tgID} from "../utils/telegramAPI";

export default class User {
    static async getUser() {
        const response = await request.get(
            'general_info',
            {
                params: {
                    telegram_id: tgID,
                    hash_key: tgHash
                }
            }
        )
        return {
            response,
            data: response.data
        }
    }
}


