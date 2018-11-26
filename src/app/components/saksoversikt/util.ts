import moment from 'moment';
import { Status } from '../../types/Status';

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

export const getIntlKeyForStatus = (status: Status): string => {
    switch (status) {
        case Status.OPPRETTET:
        case Status.UTREDES:
        case Status.FATTER_VEDTAK:
        case Status.IVERKSETTER_VEDTAK:
            return 'saksoversikt.heading.underBehandling';
        case Status.AVSLUTTET:
            return 'saksoversikt.heading.avsluttet';
    }
};
