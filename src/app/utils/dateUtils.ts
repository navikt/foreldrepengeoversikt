import Periode from 'app/types/uttaksplan/Periode';
import moment, { Moment } from 'moment';

export const finnNesteUtbetalingsdato = (): Moment => {
    const nesteUtbetalingsdato = moment();

    if (nesteUtbetalingsdato.date() > 25) {
        nesteUtbetalingsdato.add(1, 'months');
    }
    nesteUtbetalingsdato.set('date', 25);

    return nesteUtbetalingsdato;
};

export function formaterDato(dato: string | undefined, datoformat?: string): string {
    return moment.utc(dato).format(datoformat || 'dddd D. MMMM YYYY');
}

export function sorterPerioder(p1: Periode, p2: Periode) {
    if (moment(p1.tidsperiode.fom).isSame(p2.tidsperiode.fom, 'day')) {
        return 1;
    }

    return moment(p1.tidsperiode.fom).isBefore(p2.tidsperiode.fom, 'day') ? -1 : 1;
}
