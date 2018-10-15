import moment from 'moment';

export const isSakTooOldForEttersendelse = (opprettet: string): boolean => {
    return moment(opprettet).isBefore(moment().subtract(71, 'days'));
};
