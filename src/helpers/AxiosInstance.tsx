import axios from 'axios';

export const baseURL = process.env.REACT_APP_BACKEND_BASEURL;

export const axiosInstance = axios.create({
    baseURL: baseURL
})

