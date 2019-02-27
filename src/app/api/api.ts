import axios from 'axios';
import Environment from '../Environment';
import Ettersending from './types/Ettersending';

export const apiBaseUrl: string = Environment.REST_API_URL;

const getPerson = () => {
    return axios.get(`${apiBaseUrl}/personinfo`, { withCredentials: true });
};

const getSaker = () => {
    return axios.get(`${apiBaseUrl}/innsyn/saker`, {
        timeout: 60 * 1000,
        withCredentials: true
    });
};

const sendEttersending = (ettersending: Ettersending) => {
    return axios.post(`${apiBaseUrl}/soknad/ettersend`, ettersending, {
        timeout: 60 * 1000,
        withCredentials: true
    });
};

const log = (error: any) => {
    return axios.post('/log', error, {
        timeout: 15 * 1000,
        withCredentials: true,
        headers: {
            'content-type': 'application/json'
        }
    });
};

const Api = { getSaker, getPerson, sendEttersending, log };

export default Api;
