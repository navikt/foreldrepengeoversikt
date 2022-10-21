import { SøkerinfoDTO } from 'app/types/SøkerinfoDTO';
import { useRequest } from './useRequest';

const useSøkerinfo = () => {
    const { data, error } = useRequest<SøkerinfoDTO>('/sokerinfo', { config: { withCredentials: true } });

    return {
        søkerinfoData: data,
        søkerinfoError: error,
    };
};

const useGetSaker = (enabled: boolean) => {
    const { data, error } = useRequest<any>('/innsyn/v2/saker', {
        config: { withCredentials: true },
        isSuspended: !enabled,
    });

    return {
        sakerData: data,
        sakerError: error,
    };
};

const Api = {
    useSøkerinfo,
    useGetSaker,
};

export default Api;
