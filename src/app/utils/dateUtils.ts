import { TidsperiodeDate } from '@navikt/fp-common';
import dayjs from 'dayjs';
import { IntlShape } from 'react-intl';
import isoWeek from 'dayjs/plugin/isoWeek';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(isSameOrBefore);
dayjs.extend(isoWeek);

type VarighetFormat = 'full' | 'normal';

export const getUkerOgDagerFromDager = (dager: number): { uker: number; dager: number } => {
    const uker = Math.floor(dager / 5);
    return {
        dager: dager - uker * 5,
        uker,
    };
};

export const getVarighetString = (antallDager: number, intl: IntlShape, format: VarighetFormat = 'full'): string => {
    const { uker, dager } = getUkerOgDagerFromDager(Math.abs(antallDager));
    const dagerStr = intl.formatMessage(
        { id: 'varighet.dager' },
        {
            dager,
        }
    );

    if (uker === 0) {
        return dagerStr;
    }

    const ukerStr = intl.formatMessage({ id: 'varighet.uker' }, { uker });

    if (dager > 0) {
        return `${ukerStr}${intl.formatMessage({
            id: `varighet.separator--${format}`,
        })}${dagerStr}`;
    }

    return ukerStr;
};

const isValidTidsperiode = (tidsperiode: any): tidsperiode is TidsperiodeDate => {
    return (
        tidsperiode.fom !== undefined &&
        tidsperiode.tom !== undefined &&
        dayjs(tidsperiode.fom).isSameOrBefore(tidsperiode.tom, 'day')
    );
};

const getUkedag = (dato: Date): number => {
    return dayjs(dato).isoWeekday();
};

const erUttaksdag = (dato: Date): boolean => {
    return getUkedag(dato) !== 6 && getUkedag(dato) !== 7;
};

export const getAntallUttaksdagerITidsperiode = (tidsperiode: TidsperiodeDate): number => {
    if (!isValidTidsperiode(tidsperiode)) {
        return 0;
    }

    let fom = dayjs(tidsperiode.fom);
    const tom = dayjs(tidsperiode.tom);
    let antall = 0;

    while (fom.isSameOrBefore(tom, 'day')) {
        if (erUttaksdag(fom.toDate())) {
            antall++;
        }
        fom = fom.add(24, 'hours');
    }

    return antall;
};
