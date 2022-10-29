import axios from "axios";

export const request = axios.create({
    baseURL: 'https://tgwebapp.ru/api/',
    // baseURL: 'https://jsonplaceholder.typicode.com/',
});