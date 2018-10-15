import moment from 'moment';

export const isSakTooOldForEttersendelse = (date: string): boolean => {
    return moment(date).isBefore(moment().subtract(71, 'days'));
};

export function formatDate(dato: string, datoformat?: string): string {
    return moment(dato).format(datoformat || 'D. MMMM YYYY');
}