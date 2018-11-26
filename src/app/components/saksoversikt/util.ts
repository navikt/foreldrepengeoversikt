import moment from 'moment';
import { FagsakStatus } from '../../types/FagsakStatus';

export const isSakTooOldForEndringssøknad = (date?: string): boolean => {
    if (date === undefined) {
        return false;
    }

    return moment(date).isBefore(
        moment()
            .subtract(3, 'years')
            .subtract(1, 'days')
    );
};

export const isSakTooOldForEttersendelse = (date?: string): boolean => {
    if (date === undefined) {
        return false;
    }

    return moment(date).isBefore(moment().subtract(71, 'days'));
};

export function formatDate(dato: string, datoformat?: string): string {
    return moment(dato).format(datoformat || 'D. MMMM YYYY');
}

export const getIntlKeyForStatus = (status: FagsakStatus): string => {
    switch (status) {
        case FagsakStatus.OPPRETTET:
        case FagsakStatus.UNDER_BEHANDLING:
        case FagsakStatus.LOPENDE:
            return 'saksoversikt.heading.underBehandling';
        case FagsakStatus.AVSLUTTET:
            return 'saksoversikt.heading.avsluttet';
    }
};
