import {request} from "../utils/axiosInstance";
import {tgHash, tgID, tgInitData} from "../utils/telegramAPI";

export default class Security {
    static async postHashKey() {
        const response = await request.post(
            'authorization',
            {
                init_data: tgInitData
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