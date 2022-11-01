import axios from "axios";

export const request = axios.create({
    baseURL: 'https://crypto-learn.ru/api',
});