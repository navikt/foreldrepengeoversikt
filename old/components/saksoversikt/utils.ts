import moment from 'moment';
import { FagsakStatus } from '../../api/types/sak/FagsakStatus';
import SakBase from 'app/api/types/sak/Sak';
import { erInfotrygdSak, getNyesteBehandling } from 'app/utils/sakerUtils';
import { BehandlingType, BehandlingResultatType } from 'app/api/types/sak/Behandling';

export const isSakTooOldForEttersendelse = (sak: SakBase): boolean => {
    return !moment(sak.opprettet).isSameOrAfter(moment().subtract(150, 'days'));
};

export const isSakEligableForEttersendelse = (sak: SakBase): boolean => {
    if (sak.saksnummer === undefined) {
        return false;
    }

    if (erInfotrygdSak(sak)) {
        return !isSakTooOldForEttersendelse(sak);
    }

    const nyesteInnvilgetElllerAvslåtteBehandlig =
        sak.behandlinger &&
        getNyesteBehandling(
            sak.behandlinger.filter(
                ({ behandlingResultat }) =>
                    behandlingResultat === BehandlingResultatType.INNVILGET ||
                    behandlingResultat === BehandlingResultatType.AVSLÅTT
            )
        );

    return (
        sak.status !== FagsakStatus.AVSLUTTET ||
        (nyesteInnvilgetElllerAvslåtteBehandlig !== undefined &&
            moment(nyesteInnvilgetElllerAvslåtteBehandlig.endretTidspunkt).isSameOrBefore(moment().add(7, 'weeks')))
    );
};

export function formatDate(dato: string, datoformat?: string): string {
    return moment(dato).format(datoformat || 'D. MMMM YYYY');
}

export const getIntlKeyForStatus = (status: FagsakStatus): string => {
    switch (status) {
        case FagsakStatus.OPPRETTET:
        case FagsakStatus.UNDER_BEHANDLING:
            return 'saksoversikt.heading.underBehandling';
        case FagsakStatus.LOPENDE:
            return 'saksoversikt.heading.løpende';
        case FagsakStatus.AVSLUTTET:
            return 'saksoversikt.heading.avsluttet';
    }
};

export const getEtikettTypeForSaksstatus = (sak: SakBase): 'suksess' | 'fokus' =>
    sak.status === FagsakStatus.LOPENDE || sak.status === FagsakStatus.AVSLUTTET ? 'suksess' : 'fokus';

export const getSaksoversiktTitle = (sak: SakBase): string => {
    const nyesteBehandlig = getNyesteBehandling(sak.behandlinger);
    const type = nyesteBehandlig && nyesteBehandlig.type;
    switch (type) {
        case BehandlingType.ENDRINGSSØKNAD:
        case BehandlingType.FORELDREPENGESØKNAD:
            return 'saksoversikt.heading.top.foreldrepenger';
        case BehandlingType.ENGANGSSØNAD:
            return 'saksoversikt.heading.top.engangsstønad';
        case BehandlingType.SVANGERSKAPSPENGESØKNAD:
            return 'saksoversikt.heading.top.svangerskapspengesoknad';
        default:
            return 'saksoversikt.heading.top.ukjent';
    }
};
