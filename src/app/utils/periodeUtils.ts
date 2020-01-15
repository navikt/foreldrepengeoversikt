import moment from 'moment';
import { StønadskontoType, OppholdsÅrsak } from 'app/api/types/UttaksplanDto';
import { Tidsperiode } from 'app/types/Tidsperiode';
import { isEqual } from 'lodash';
import { UttaksplanColor } from 'app/types/uttaksplan/UttaksplanColor';
import { InjectedIntl } from 'react-intl';
import Periode, { PeriodeType, Uttaksperiode } from 'app/types/uttaksplan/Periode';
import { Rolle } from 'app/types/Rolle';
import { ANTALL_UTTAKSDAGER_PR_UKE } from './constants';
import { NavnPåForeldre } from 'common/components/oversikt-brukte-dager/OversiktBrukteDager';

export const finnTidligerePerioder = (perioder: Periode[]): Periode[] => {
    return perioder.filter(({ tidsperiode }) => moment(tidsperiode.tom).isBefore(moment(), 'days'));
};

export const finnNåværendePerioder = (perioder: Periode[]): Periode[] => {
    return perioder.filter(({ tidsperiode }) => moment().isBetween(tidsperiode.fom, tidsperiode.tom, 'days', '[]'));
};

export const finnFremtidigePerioder = (perioder: Periode[]): Periode[] => {
    return perioder.filter(({ tidsperiode }) => moment(tidsperiode.fom).isAfter(moment(), 'days'));
};

export const getUkerOgDagerFromDager = (dager: number): { uker: number; dager: number } => {
    const uker = Math.floor(dager / ANTALL_UTTAKSDAGER_PR_UKE);
    return {
        dager: dager - uker * ANTALL_UTTAKSDAGER_PR_UKE,
        uker
    };
};

export const erSammenhengende = (tidsperiode1: Tidsperiode, tidsperiode2: Tidsperiode): boolean => {
    return (
        finnNesteMuligeUttaksdag(tidsperiode1.tom) === tidsperiode2.fom ||
        moment(tidsperiode1.tom)
            .add(1, 'days')
            .isSame(tidsperiode2.fom, 'days')
    );
};

const finnNesteMuligeUttaksdag = (dato: string): string => {
    const nesteDag = moment.utc(dato).add(1, 'day');
    return nesteDag.isoWeekday() >= 6
        ? nesteDag
            .add(1, 'weeks')
            .startOf('isoWeek')
            .format('YYYY-MM-DD')
        : nesteDag.format('YYYY-MM-DD');
};

const finnForrigeMuligeUttaksdag = (dato: string): string => {
    const dagenFør = moment.utc(dato).subtract(1, 'day');
    switch (dagenFør.isoWeekday()) {
        case 6:
            return dagenFør.subtract(1, 'day').format('YYYY-MM-DD');
        case 7:
            return dagenFør.subtract(2, 'day').format('YYYY-MM-DD');
        default:
            return dagenFør.format('YYYY-MM-DD');
    }
};

export const getStønadskontoFarge = (
    konto: StønadskontoType,
    forelder: Rolle | undefined,
    forIkon?: boolean
): UttaksplanColor => {
    if (forIkon && (konto === StønadskontoType.Fellesperiode || konto === StønadskontoType.Flerbarnsdager)) {
        return UttaksplanColor.purpleBlue;
    }

    if (forelder) {
        return forelder === Rolle.mor ? UttaksplanColor.purple : UttaksplanColor.blue;
    }

    switch (konto) {
        case StønadskontoType.Fedrekvote:
        case StønadskontoType.AktivitetsfriKvote:
            return UttaksplanColor.blue;
        case StønadskontoType.Mødrekvote:
        case StønadskontoType.Foreldrepenger:
        case StønadskontoType.ForeldrepengerFørFødsel:
            return UttaksplanColor.purple;
        case StønadskontoType.Fellesperiode:
        case StønadskontoType.Flerbarnsdager:
            return UttaksplanColor.purpleBlue;
        default:
            return UttaksplanColor.transparent;
    }
};

export const getVarighetString = (antallDager: number, intl: InjectedIntl): string => {
    const { uker, dager } = getUkerOgDagerFromDager(Math.abs(antallDager));
    const dagerStr = intl.formatMessage(
        { id: 'common.varighet.dager' },
        {
            dager
        }
    );
    if (uker === 0) {
        return dagerStr;
    }
    const ukerStr = intl.formatMessage({ id: 'common.varighet.uker' }, { uker });
    if (dager > 0) {
        return `${ukerStr}${intl.formatMessage({
            id: `common.varighet.separator--full`
        })}${dagerStr}`;
    }
    return ukerStr;
};

export const getAntallUttaksdagerITidsperiode = (tidsperiode: Tidsperiode, graderingsprosent?: string, samtidiguttaksprosent?: number): number => {
    const fom = moment(tidsperiode.fom);
    const tom = moment(tidsperiode.tom);
    let antall = 0;
    while (fom.isSameOrBefore(tom, 'day')) {
        if (fom.isoWeekday() < 6) {
            antall++;
        }
        fom.add(24, 'hours');
    }
    return justerForGraderingEllerSamtidigUttak(antall, graderingsprosent, samtidiguttaksprosent);
};

const justerForGraderingEllerSamtidigUttak = (antallDager: number, graderingsprosent: string | undefined, samtidiguttaksprosent: number | undefined) => {
    if (samtidiguttaksprosent !== undefined && samtidiguttaksprosent > 0) {
        return Math.floor(antallDager * samtidiguttaksprosent / 100);
    }

    if (graderingsprosent !== undefined && parseFloat(graderingsprosent) > 0) {
        return Math.floor(antallDager * parseFloat(graderingsprosent) / 100);
    }

    return antallDager;
};

export const fyllInnHull = (periodeAcc: Periode[], periode: Periode, index: number, periodene: Periode[]) => {
    periodeAcc.push(periode);
    const nestePeriode = periodene[index + 1];
    if (
        erHullMellomPerioder(periode, nestePeriode) &&
        !harAnnenForelderSamtidigUttakISammePeriode(periode, periodene)
    ) {
        const tidsperiode = {
            fom: finnNesteMuligeUttaksdag(periode.tidsperiode.tom),
            tom: finnForrigeMuligeUttaksdag(nestePeriode.tidsperiode.fom)
        };

        periodeAcc.push({
            type: PeriodeType.Hull,
            tidsperiode,
            antallUttaksdager: getAntallUttaksdagerITidsperiode(tidsperiode)
        });
    }
    return periodeAcc;
};

export const erHullMellomPerioder = (periode: Periode, nestePeriode?: Periode) => {
    return (
        nestePeriode !== undefined &&
        !erSammenhengende(periode.tidsperiode, nestePeriode.tidsperiode) &&
        moment(periode.tidsperiode.tom).isBefore(nestePeriode.tidsperiode.fom, 'days')
    );
};

export const getAnnenPartsPeriodeMedSamtidigUttak = (periode: Periode, perioder: Periode[]): Periode | undefined => {
    return perioder
        .filter((p) => p.type === PeriodeType.Uttak && !isEqual(p, periode))
        .find(
            (uttaksperiode: Uttaksperiode) =>
                isEqual(periode.tidsperiode.fom, uttaksperiode.tidsperiode.fom) &&
                ((periode as Uttaksperiode).samtidigUttak || uttaksperiode.samtidigUttak)
        );
};

export const harAnnenForelderSamtidigUttakISammePeriode = (periode: Periode, perioder: Periode[]): boolean => {
    return getAnnenPartsPeriodeMedSamtidigUttak(periode, perioder) !== undefined;
};

export const getStønadskontoTypeFromOppholdsÅrsak = (årsak: OppholdsÅrsak): StønadskontoType => {
    switch (årsak) {
        case OppholdsÅrsak.UTTAK_FEDREKVOTE_ANNEN_FORELDER:
            return StønadskontoType.Fedrekvote;
        case OppholdsÅrsak.UTTAK_FELLESP_ANNEN_FORELDER:
            return StønadskontoType.Fellesperiode;
        case OppholdsÅrsak.UTTAK_MØDREKVOTE_ANNEN_FORELDER:
            return StønadskontoType.Mødrekvote;
    }
};

export const skalVisesIPeriodeListe = (periode: Periode, perioder: Periode[]): boolean => {
    if (perioder.length <= 1) {
        return true;
    }

    return (
        !harAnnenForelderSamtidigUttakISammePeriode(periode, perioder) ||
        (harAnnenForelderSamtidigUttakISammePeriode(periode, perioder) && !periode.gjelderAnnenPart)
    );
};

export const getPerioderForRolle = (rolle: Rolle, perioder: Periode[]) => {
    return perioder.filter(({ forelder }) => forelder === rolle);
};

export const erGradert = (periode: Periode) => {
    return periode.type === PeriodeType.Uttak ? (periode as Uttaksperiode).graderingInnvilget : false;
};

export const getNavnPåForelderForPeriode = (periode: Periode, navnPåForeldre: NavnPåForeldre) => {
    return periode.forelder === Rolle.mor ? navnPåForeldre.mor : navnPåForeldre.farMedmor;
};
