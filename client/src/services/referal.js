import {request} from "../utils/axiosInstance";

export default class Referal {
    static async getReferalInfo() {
        const response = await request.get(
            'referal_info',
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