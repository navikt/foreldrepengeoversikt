import isoWeek from 'dayjs/plugin/isoWeek';
import utc from 'dayjs/plugin/utc';
import dayjs from 'dayjs';

dayjs.extend(isoWeek);
dayjs.extend(utc);

export const Uttaksdagen = (dato: Date) => ({
    erUttaksdag: (): boolean => erUttaksdag(dato),
    forrige: (): Date => getUttaksdagFørDato(dato),
    neste: (): Date => getUttaksdagEtterDato(dato),
    denneEllerNeste: (): Date => getUttaksdagFraOgMedDato(dato),
    denneEllerForrige: (): Date => getUttaksdagTilOgMedDato(dato),
});

const getUkedag = (dato: Date): number => {
    return dayjs(dato).isoWeekday();
};

export const erUttaksdag = (dato: Date): boolean => {
    return getUkedag(dato) !== 6 && getUkedag(dato) !== 7;
};

const getUttaksdagFørDato = (dato: Date): Date => {
    return getUttaksdagTilOgMedDato(dayjs.utc(dato).subtract(24, 'hours').toDate());
};

const getUttaksdagTilOgMedDato = (dato: Date): Date => {
    switch (getUkedag(dato)) {
        case 6:
            return dayjs.utc(dato).subtract(24, 'hours').toDate();
        case 7:
            return dayjs.utc(dato).subtract(48, 'hours').toDate();
        default:
            return dato;
    }
};

const getUttaksdagEtterDato = (dato: Date): Date => {
    return getUttaksdagFraOgMedDato(dayjs.utc(dato).add(24, 'hours').toDate());
};

const getUttaksdagFraOgMedDato = (dato: Date): Date => {
    switch (getUkedag(dato)) {
        case 6:
            return dayjs.utc(dato).add(48, 'hours').toDate();
        case 7:
            return dayjs.utc(dato).add(24, 'hours').toDate();
        default:
            return dato;
    }
};
