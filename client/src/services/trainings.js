import {request} from "../utils/axiosInstance";

export default class Trainings {
    static async getAllTrainings() {
        const response = await request.get(
            'training_general_info',
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