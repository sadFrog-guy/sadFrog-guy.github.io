import {request} from "../utils/axiosInstance";
import {tgID} from "../utils/telegramAPI";

export default class Calculator {
    static async getChains(amount) {
        const response = await request.get(
            'get_chains',
            {
                params: {
                    telegram_id: tgID,
                    amount: amount
                }
            }
        )
        return {
            response,
            data: response.data.chains
        }
    }
}