import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
import Environment from 'app/Environment';
import { redirectToLogin } from 'app/utils/login';

const REST_API_URL: string = Environment.REST_API_URL;
const AxiosWithInterceptor = axios.create({ baseURL: REST_API_URL });

AxiosWithInterceptor.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
    config.withCredentials = true;
    return config;
});

AxiosWithInterceptor.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (response: AxiosError) => {
        if (response.response && response.response.status === 401) {
            redirectToLogin();
        }
        return Promise.reject(response);
    }
);

export default AxiosWithInterceptor;
