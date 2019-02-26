import Sak, { SakType } from '../types/Sak';
import { FagsakStatus } from '../types/FagsakStatus';
import Behandling, { BehandlingStatus, BehandlingTema, BehandlingÅrsak } from '../types/Behandling';

export const sakByDescendingOrder = (a: Sak, b: Sak) => b.opprettet.localeCompare(a.opprettet);
export const behandlingByDescendingOrder = (a: Behandling, b: Behandling) => b.opprettetTidspunkt.localeCompare(a.opprettetTidspunkt);
export const behandlingByAscendingOrder = (a: Behandling, b: Behandling) => a.opprettetTidspunkt.localeCompare(b.opprettetTidspunkt);

export const erUnderBehandling = (sak: Sak): any => {
    return sak && sak.status && (sak.status === FagsakStatus.OPPRETTET || sak.status === FagsakStatus.UNDER_BEHANDLING);
};

const getBehandling = (sak: Sak): Behandling | undefined => {
    if (sak !== undefined && sak.behandlinger !== undefined && sak.behandlinger.length > 0) {
        return sak.behandlinger[0];
    }
    return undefined;
};

export const erEndringssøknad = (sak: Sak) => {
    if (!sak.behandlinger) {
        return false;
    }
    return sak.behandlinger.some((b: Behandling) => b.årsak === BehandlingÅrsak.ENDRING_FRA_BRUKER);
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

export const erEngangsstønad = (sak: Sak): boolean => {
    const behandling = getBehandling(sak);
    if (behandling === undefined) {
        return true;
    } else {
        const { tema } = behandling;
        return (
            tema === BehandlingTema.ENGANGSTØNAD ||
            tema === BehandlingTema.ENGANGSTØNAD_ADOPSJON ||
            tema === BehandlingTema.ENGANGSTØNAD_FØDSEL
        );
    }
};

export const harEnAvsluttetBehandling = (sak: Sak): boolean => {
    return sak.behandlinger
        ? sak.behandlinger.some((behandling: Behandling) => behandling.status === BehandlingStatus.AVSLUTTET)
        : false;
};

export const skalKunneSøkeOmEndring = (nyesteSak: Sak): boolean => {
    if (!erForeldrepengesak(nyesteSak)) {
        return false;
    }

    return (
        (nyesteSak.status !== FagsakStatus.AVSLUTTET && harEnAvsluttetBehandling(nyesteSak)) ||
        erInfotrygdSak(nyesteSak)
    );
};

export const erInfotrygdSak = (sak: Sak): boolean => {
    return sak.type === SakType.SAK;
};
