import moment from 'moment';
import { FagsakStatus } from '../../types/FagsakStatus';
import Sak from 'app/types/Sak';

export const isSakTooOldForEttersendelse = (date?: string): boolean => {
    if (date === undefined) {
        return false;
    }

    return moment(date).isBefore(moment().subtract(71, 'days'));
};

export const isSakEligableForEttersendelse = (sak: Sak): boolean => {
    const { opprettet, saksnummer } = sak;
    if (opprettet === undefined) {
        return false;
    }
    return moment(opprettet).isSameOrAfter(moment().subtract(71, 'days')) && saksnummer !== undefined;
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


export const getEtikettTypeForSaksstatus = (sak: Sak): 'suksess' | 'fokus' => 
    sak.status === FagsakStatus.LOPENDE || sak.status === FagsakStatus.AVSLUTTET ? 'suksess' : 'fokus';
