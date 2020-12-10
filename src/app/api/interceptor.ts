import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
import Environment from 'app/Environment';
import { redirectToLogin } from 'app/utils/redirect';

const REST_API_URL: string = Environment.REST_API_URL;
const AxiosApiInterceptor = axios.create({ baseURL: REST_API_URL });

AxiosApiInterceptor.interceptors.request.use(
    (config: AxiosRequestConfig): AxiosRequestConfig => {
        config.withCredentials = true;
        config.timeout = 60 * 1000;
        return config;
    }
);

AxiosApiInterceptor.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (response: AxiosError) => {
        if (response.response && (response.response.status === 401 || response.response.status === 403)) {
            redirectToLogin();
        }
        return Promise.reject(response);
    }
);

export default AxiosApiInterceptor;
