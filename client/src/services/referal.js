import {request} from "../utils/axiosInstance";
import {tgHash, tgID} from "../utils/telegramAPI";

export default class Referal {
    static async getReferalInfo() {
        const response = await request.get(
            'referal_info',
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