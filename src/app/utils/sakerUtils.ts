import SakBase, { SakType } from '../api/types/sak/Sak';
import { FagsakStatus } from '../api/types/sak/FagsakStatus';
import Behandling, { BehandlingStatus, BehandlingÅrsak, BehandlingType } from '../api/types/sak/Behandling';
import { StorageKvittering } from '../api/types/StorageKvittering';

export const sakByDescendingOrder = (a: SakBase, b: SakBase) => b.opprettet.localeCompare(a.opprettet);
export const behandlingByDescendingOrder = (a: Behandling, b: Behandling) =>
    b.opprettetTidspunkt.localeCompare(a.opprettetTidspunkt);

export const erUnderBehandling = (sak: SakBase): boolean => {
    return (
        sak.status !== undefined &&
        (sak.status === FagsakStatus.OPPRETTET || sak.status === FagsakStatus.UNDER_BEHANDLING)
    );
};

export const erLøpende = (sak: SakBase): boolean => {
    return sak.status !== undefined && sak.status === FagsakStatus.LOPENDE;
};

export const erAvsluttet = (sak: SakBase): boolean => {
    return sak.status !== undefined && sak.status === FagsakStatus.AVSLUTTET;
};

export const getNyesteSak = (saker: SakBase[]): SakBase | undefined => {
    return saker.sort(sakByDescendingOrder)[0];
};

export const getNyesteBehandling = (behandlinger?: Behandling[]): Behandling | undefined => {
    if (behandlinger !== undefined && behandlinger.length > 0) {
        return behandlinger.sort(behandlingByDescendingOrder)[0];
    }
    return undefined;
};

export const getAlleBehandlinger = (saker: SakBase[]): Behandling[] => {
    const behandlinger: Behandling[] = [];
    saker.forEach((sak: SakBase) => {
        if (sak.behandlinger) {
            behandlinger.push(...sak.behandlinger);
        }
    });
    return behandlinger;
};

export const harSendtInnEndringssøknad = (sak: SakBase) => {
    return sak.behandlinger === undefined
        ? false
        : sak.behandlinger.some((b: Behandling) => b.årsak === BehandlingÅrsak.ENDRING_FRA_BRUKER);
};

export const erForeldrepengesak = (sak: SakBase): boolean => {
    const behandling = getNyesteBehandling(sak.behandlinger);
    return behandling === undefined ? true : behandling.type === BehandlingType.FORELDREPENGESØKNAD;
};

export const erEngangsstønad = (sak: SakBase): boolean => {
    const behandling = getNyesteBehandling(sak.behandlinger);
    return behandling === undefined ? false : behandling.type === BehandlingType.ENGANGSSØNAD;
};

export const erSvangerskapepengesak = (sak: SakBase): boolean => {
    const behandlig = getNyesteBehandling(sak.behandlinger);
    return behandlig === undefined ? false : behandlig.type === BehandlingType.SVANGERSKAPSPENGESØKNAD;
};

export const harEnAvsluttetBehandling = (sak: SakBase): boolean => {
    return sak.behandlinger ? sak.behandlinger.some(erBehandlingAvsluttet) : false;
};

export const erBehandlingAvsluttet = (behandling: Behandling) => {
    return behandling.status === BehandlingStatus.AVSLUTTET;
};

export const skalKunneSøkeOmEndring = (sak: SakBase): boolean => {
    if (!erForeldrepengesak(sak) || sak.saksnummer === undefined) {
        return false;
    }
    return (sak.status !== FagsakStatus.AVSLUTTET && harEnAvsluttetBehandling(sak)) || erInfotrygdSak(sak);
};

export const erInfotrygdSak = (sak: SakBase): boolean => {
    return sak.type === SakType.SAK;
};

export const opprettFiktivSak = (storageKvittering: StorageKvittering): SakBase => ({
    saksnummer: undefined,
    type: SakType.SAK,
    opprettet: storageKvittering.innsendingstidspunkt
});

export const harSøkt = (sak: SakBase): boolean => {
    return !erInfotrygdSak(sak) ? sak.behandlinger !== undefined && sak.behandlinger.length > 0 : true;
};

export const getEldsteBehadnling = (behandlinger: Behandling[]): Behandling | undefined => {
    if (behandlinger !== undefined) {
        return behandlinger.sort(behandlingByDescendingOrder).reverse()[0];
    }
    return undefined;
};
