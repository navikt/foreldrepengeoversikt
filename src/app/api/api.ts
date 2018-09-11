import axios from 'axios';
import Environment from '../Environment';

const apiBaseUrl: string = Environment.REST_API_URL;

const getSøkerInfo = () => {
    return axios.get(`${apiBaseUrl}/saker`, {
        timeout: 10 * 1000,
        withCredentials: true
    });
};

const Api = { getSøkerInfo };

export default Api;
