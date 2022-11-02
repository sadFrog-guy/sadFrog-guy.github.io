import {request} from "../utils/axiosInstance";
import {tgID} from "../utils/consts";

export default class User {
    static async getUser() {
        const response = await request.get(
            'general_info',
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


