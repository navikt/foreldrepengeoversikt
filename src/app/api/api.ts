import { Dokument } from 'app/types/Dokument';
import { SakOppslagDTO } from 'app/types/SakOppslag';
import { SøkerinfoDTO } from 'app/types/SøkerinfoDTO';
import { Tidslinjehendelse } from 'app/types/Tidslinjehendelse';
import { useRequest } from './useRequest';

const useSøkerinfo = () => {
    const { data, error } = useRequest<SøkerinfoDTO>('/sokerinfo', { config: { withCredentials: true } });

    return {
        søkerinfoData: data,
        søkerinfoError: error,
    };
};

const useGetSaker = () => {
    const { data, error } = useRequest<SakOppslagDTO>('/innsyn/v2/saker', {
        config: { withCredentials: true },
    });

    return {
        sakerData: data,
        sakerError: error,
    };
};

const useGetAnnenPartsVedtak = (isSuspended: boolean) => {
    const { data, error } = useRequest<any>('/innsyn/v2/annenPartVedtak', {
        config: { withCredentials: true },
        isSuspended,
    });

    return {
        annenPartsVedakData: data,
        annenPartsVedtakError: error,
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

const useGetTidslinjeHendelser = (saksnr: string) => {
    const { data, error } = useRequest<Tidslinjehendelse[]>('/innsyn/tidslinje', {
        config: { withCredentials: true, params: { saksnummer: saksnr } },
    });

    return {
        tidslinjeHendelserData: data,
        tidslinjeHendelserError: error,
    };
};

const Api = {
    useSøkerinfo,
    useGetSaker,
    useGetDokumenter,
    useGetAnnenPartsVedtak,
    useGetTidslinjeHendelser,
};

export default Api;
