import moment, { Moment } from 'moment';

export const finnNesteUtbetalingsdato = (): Moment => {
    const nesteUtbetalingsdato = moment();

    if (nesteUtbetalingsdato.date() > 25) {
        nesteUtbetalingsdato.add(1, 'months');
    }
    nesteUtbetalingsdato.set('date', 25);

    return nesteUtbetalingsdato;
}
