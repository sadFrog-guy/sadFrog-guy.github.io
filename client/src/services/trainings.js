import {request} from "../utils/axiosInstance";
import {useParams} from "react-router-dom";
import {tgID} from "../utils/consts";

export default class Trainings {

    static async getAllTrainings() {
        const response = await request.get(
            'training_general_info',
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

    static async getOneTraining(id) {
        const response = await request.get(
            'training_section_info',
            {
                params: {
                    telegram_id: tgID,
                    section_id: id
                }
            }
        )

        return {
            response,
            data: response.data
        }
    }

    static async getAccessToVideo(id) {
        const response = await request.get(
            'get_access_to_article',
            {
                params: {
                    telegram_id: tgID,
                    section_id: id
                }
            }
        )

        return {
            response,
            data: response.data
        }
    }

    static async readTraining(id) {
        await request({
            method: 'post',
            url: 'section_viewed',
            params: {
                telegram_id: tgID,
                section_id: id.id
            },
            data: {
                viewed: true
            }
        })
        .then((response) => {
            console.log('Ответ сервера успешно получен!');
            return {
                response,
                data: response.data
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }
}