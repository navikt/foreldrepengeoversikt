import { guid } from '@navikt/fp-common';
import { ISOStringToDate } from '@navikt/sif-common-formik-ds/lib';
import { Periode, PeriodeDTO, Tidsperiode, Tidsperioden } from 'app/types/Periode';
import dayjs from 'dayjs';
import { Uttaksdagen } from './Uttaksdagen';

export const isUttaksperiode = (periode: Periode) => {
    return periode.kontoType !== undefined;
};

export const isUtsettelsesperiode = (periode: Periode) => {
    return periode.utsettelseÅrsak !== undefined;
};

export const isOverføringsperiode = (periode: Periode) => {
    return periode.overføringÅrsak !== undefined;
};

export const isOppholdsperiode = (periode: Periode) => {
    return periode.oppholdÅrsak !== undefined;
};

export const isAvslåttPeriode = (periode: Periode) => {
    return periode.resultat.innvilget === true;
};

export function isValidTidsperiode(tidsperiode: Tidsperiode): boolean {
    return (
        tidsperiode.fom !== undefined &&
        tidsperiode.tom !== undefined &&
        dayjs(tidsperiode.fom).isSameOrBefore(tidsperiode.tom, 'day')
    );
}

interface SplittetDatoType {
    dato: Date;
    erFom: boolean;
}

//TODO: hvordan vise oppholdsperioder til annen part, skal de vises som uttak for brukeren?
export const getPerioderForVisning = (perioder: PeriodeDTO[], erAnnenPartsPeriode: boolean): Periode[] => {
    return perioder
        .map((periode) => {
            const { fom, tom, ...periodeRest } = periode;
            return {
                ...periodeRest,
                tidsperiode: {
                    fom: ISOStringToDate(fom),
                    tom: ISOStringToDate(tom),
                },
                gjelderAnnenPart: erAnnenPartsPeriode,
                id: guid(),
            };
        })
        .filter(
            (p) =>
                isValidTidsperiode(p.tidsperiode) &&
                (isUttaksperiode(p) || isOverføringsperiode(p) || isUtsettelsesperiode(p))
        );
};

const splittPeriodePåDatoer = (periode: Periode, alleDatoer: SplittetDatoType[]) => {
    const datoerIPerioden = alleDatoer.filter((datoWrapper) =>
        Tidsperioden(periode.tidsperiode).inneholderDato(datoWrapper.dato)
    );
    const oppsplittetPeriode: Periode[] = [];

    if (datoerIPerioden.length === 2) {
        return [periode];
    }

    datoerIPerioden.forEach((datoWrapper, index) => {
        if (index === 0) {
            oppsplittetPeriode.push({
                ...periode,
                tidsperiode: { fom: datoWrapper.dato, tom: undefined! },
            });
            return;
        }

        oppsplittetPeriode[index - 1].tidsperiode.tom = datoWrapper.erFom
            ? Uttaksdagen(datoWrapper.dato).forrige()
            : datoWrapper.dato;

        if (index < datoerIPerioden.length - 1) {
            oppsplittetPeriode.push({
                ...periode,
                id: guid(),
                tidsperiode: {
                    fom: datoWrapper.erFom ? datoWrapper.dato : Uttaksdagen(datoWrapper.dato).neste(),
                    tom: undefined!,
                },
            });
        }
    });

    return oppsplittetPeriode.filter((p) => isValidTidsperiode(p.tidsperiode));
};

export const normaliserPerioder = (perioder: Periode[], annenPartsUttak: Periode[]) => {
    const perioderTidsperioder: SplittetDatoType[] = perioder.reduce((res, p) => {
        res.push({ dato: p.tidsperiode.fom!, erFom: true });
        res.push({ dato: p.tidsperiode.tom!, erFom: false });
        return res;
    }, [] as SplittetDatoType[]);
    const annenPartsUttakTidsperioder = annenPartsUttak.reduce((res, p) => {
        res.push({ dato: p.tidsperiode.fom!, erFom: true });
        res.push({ dato: p.tidsperiode.tom!, erFom: false });
        return res;
    }, [] as SplittetDatoType[]);

    const alleDatoer = perioderTidsperioder.concat(annenPartsUttakTidsperioder).sort((d1, d2) => {
        if (d1.dato.getTime() - d2.dato.getTime() === 0) {
            if (!d1.erFom) {
                return 1;
            }

            if (!d2.erFom) {
                return -1;
            }
        }
        return d1.dato.getTime() - d2.dato.getTime();
    });

    const normaliserteEgnePerioder: Periode[] = [];
    const normaliserteAnnenPartsPerioder: Periode[] = [];

    perioder.forEach((p) => {
        const oppsplittetPeriode = splittPeriodePåDatoer(p, alleDatoer);
        normaliserteEgnePerioder.push(...oppsplittetPeriode);
    });

    annenPartsUttak.forEach((p) => {
        const oppsplittetPeriode = splittPeriodePåDatoer(p, alleDatoer);
        normaliserteAnnenPartsPerioder.push(...oppsplittetPeriode);
    });

    return {
        normaliserteEgnePerioder,
        normaliserteAnnenPartsPerioder,
    };
};

// export function sorterPerioder(p1: Periode, p2: Periode) {
//     if (isValidTidsperiode(p1.tidsperiode) === false || isValidTidsperiode(p2.tidsperiode) === false) {
//         return isValidTidsperiode(p1.tidsperiode) ? 1 : -1;
//     }
//     if (dayjs(p1.tidsperiode.fom).isSame(p2.tidsperiode.fom, 'day')) {
//         return p1.gjelderAnnenPart ? -1 : 1;
//     }

//     if (Tidsperioden(p2.tidsperiode).erOmsluttetAv(p1.tidsperiode)) {
//         return 1;
//     }

//     return dayjs(p1.tidsperiode.fom).isBefore(p2.tidsperiode.fom, 'day') ? -1 : 1;
// }
