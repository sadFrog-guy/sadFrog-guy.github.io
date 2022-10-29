import {request} from "../utils/axiosInstance";

export default class User {
    static async getUser() {
        const response = await request.get(
            'general_info',
            {
                params: {
                    telegram_id: 875571046,
                }
            }
        )
        return {
            response,
            data: response.data
        }
    }
}


