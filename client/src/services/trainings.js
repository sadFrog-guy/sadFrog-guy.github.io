import {request} from "../utils/axiosInstance";
import {useParams} from "react-router-dom";

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

    static async getOneTraining(id) {
        const response = await request.get(
            'training_section_info',
            {
                params: {
                    telegram_id: 875571046,
                    section_id: id
                }
            }
        )

        return {
            response,
            data: response.data
        }
    }
}