import moment from 'moment';

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
