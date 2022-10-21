import axios, { AxiosError, AxiosResponse } from 'axios';
import Environment from 'app/Environment';

const apiBaseUrl = Environment.REST_API_URL;

const AxiosInstance = axios.create({ baseURL: apiBaseUrl });

const getAxiosInstance = () => {
    AxiosInstance.interceptors.response.use(
        (response: AxiosResponse) => {
            return response;
        },
        (response: AxiosError) => {
            if (response.response && response.response.status === 409) {
            }
            return Promise.reject(response);
        }
    );

    return AxiosInstance;
};

export default getAxiosInstance;
