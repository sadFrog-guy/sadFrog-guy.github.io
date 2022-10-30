import axios from "axios";

export const request = axios.create({
    baseURL: 'crypto-learn.ru',
});