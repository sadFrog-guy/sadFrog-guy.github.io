import {request} from "../utils/axiosInstance";
import {tgHash, tgID} from "../utils/telegramAPI";

export default class Security {
    static async postHashKey() {
        const response = await request.post(
            'authorization',
            {
                init_data: tgHash,
                telegram_id: tgID
            },
            {
                headers:
                    {'Content-Type': 'application/x-www-form-urlencoded'}
            }
        )
        return {
            response,
            data: response.data
        }
    }
}