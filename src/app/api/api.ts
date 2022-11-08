import { Dokument } from 'app/types/Dokument';
import { SakOppslag } from 'app/types/SakOppslag';
import { SøkerinfoDTO } from 'app/types/SøkerinfoDTO';
import { useRequest } from './useRequest';

const useSøkerinfo = () => {
    const { data, error } = useRequest<SøkerinfoDTO>('/sokerinfo', { config: { withCredentials: true } });

    return {
        søkerinfoData: data,
        søkerinfoError: error,
    };
};

const useGetSaker = () => {
    const { data, error } = useRequest<SakOppslag>('/innsyn/v2/saker', {
        config: { withCredentials: true },
    });

    return {
        sakerData: data,
        sakerError: error,
    };
};

const useGetDokumenter = () => {
    const { data, error } = useRequest<Dokument[]>('/dokument/alle', {
        config: { withCredentials: true },
    });

    return {
        dokumenterData: data,
        dokumenterError: error,
    };
};

const Api = {
    useSøkerinfo,
    useGetSaker,
    useGetDokumenter,
};

export default Api;
