import Sak, { SakType } from '../types/Sak';
import { FagsakStatus } from '../types/FagsakStatus';
import Behandling, { BehandlingTema } from '../types/Behandling';

export const datesByDescendingOrder = (a: Sak, b: Sak) => b.opprettet.localeCompare(a.opprettet);

const getBehandling = (sak: Sak): Behandling | undefined => {
    if (sak !== undefined && sak.behandlinger !== undefined && sak.behandlinger.length > 0) {
        return sak.behandlinger[0];
    }
    return undefined;
};

export const erForeldrepengesak = (sak: Sak): boolean => {
    const behandling = getBehandling(sak);
    if (behandling === undefined) {
        return true;
    } else {
        const { tema } = behandling;
        return (
            tema === BehandlingTema.FORELDREPENGER ||
            tema === BehandlingTema.FORELDREPENGER_ADOPSJON ||
            tema === BehandlingTema.FORELDREPENGER_FØDSEL ||
            tema === BehandlingTema.UDEFINERT
        );
    }
};

export const skalKunneSøkeOmEndring = (nyesteSak: Sak): boolean => {
    if (!erForeldrepengesak(nyesteSak)) {
        return false;
    }

    return nyesteSak.status === FagsakStatus.LOPENDE || erInfotrygdSak(nyesteSak);
};

export const erInfotrygdSak = (sak: Sak): boolean => {
    return sak.type === SakType.SAK;
};
