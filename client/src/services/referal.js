import {request} from "../utils/axiosInstance";
import {tgID} from "../utils/consts";

export default class Referal {
    static async getReferalInfo() {
        const response = await request.get(
            'referal_info',
            {
                params: {
                    telegram_id: tgID,
                }
            }
        )
        return {
            response,
            data: response.data
        }
    }
}