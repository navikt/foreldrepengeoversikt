import moment from 'moment';
import { UttaksPeriodeDto, StønadskontoType } from 'app/api/types/UttaksplanDto';
import { Tidsperiode } from 'app/types/Tidsperiode';
import _ from 'lodash';
import { UttaksplanColor } from 'app/types/uttaksplan/UttaksplanColor';
import { InjectedIntl } from 'react-intl';
import Periode, { PeriodeType, Uttaksperiode } from 'app/types/uttaksplan/Periode';
import { Rolle } from 'app/types/Rolle';

const ANTALL_UTTAKSDAGER_PR_UKE: number = 5;

export const finnTidligerePerioder = (perioder: Periode[]): Periode[] => {
    return perioder.filter((periode) => moment(periode.tidsperiode.tom).isBefore(moment()));
};

export const finnNåværendePerioder = (perioder: Periode[]): Periode[] => {
    return perioder.filter((periode) =>
        moment().isBetween(periode.tidsperiode.fom, periode.tidsperiode.tom, 'day', '[]')
    );
};

export const finnFremtidigePerioder = (perioder: Periode[]): Periode[] => {
    return perioder.filter((periode) => moment(periode.tidsperiode.fom).isAfter(moment()));
};

export const getUkerOgDagerFromDager = (dager: number): { uker: number; dager: number } => {
    const uker = Math.floor(dager / ANTALL_UTTAKSDAGER_PR_UKE);
    return {
        dager: dager - uker * ANTALL_UTTAKSDAGER_PR_UKE,
        uker
    };
};

export const slåSammenLikeOgSammenhengendeUttaksperioder = (uttaksperioder: UttaksPeriodeDto[]): UttaksPeriodeDto[] => {
    return uttaksperioder.reduce((uttaksperiodeAccumulator: UttaksPeriodeDto[], uttaksperiode, index) => {
        const previousUttaksperiode = uttaksperiodeAccumulator[index - 1];
        if (skalKunneSlåSammenUttaksperioer(previousUttaksperiode, uttaksperiode)) {
            uttaksperiodeAccumulator.pop();
            uttaksperiodeAccumulator.push({
                ...previousUttaksperiode,
                periode: {
                    ...previousUttaksperiode.periode,
                    tom: uttaksperiode.periode.tom
                }
            });
        } else {
            uttaksperiodeAccumulator.push(uttaksperiode);
        }
        return uttaksperiodeAccumulator;
    }, []);
};

export const skalKunneSlåSammenUttaksperioer = (
    uttaksperiode1?: UttaksPeriodeDto,
    uttaksperiode2?: UttaksPeriodeDto
): boolean => {
    return uttaksperiode1 === undefined || uttaksperiode2 === undefined
        ? false
        : erSammenhengende(uttaksperiode1.periode, uttaksperiode2.periode) && erLike(uttaksperiode1, uttaksperiode2);
};

export const erSammenhengende = (tidsperiode1: Tidsperiode, tidsperiode2: Tidsperiode): boolean => {
    return (
        finnNesteMuligeUttaksdag(tidsperiode1.tom) === tidsperiode2.fom ||
        moment(tidsperiode1.tom)
            .add(1, 'days')
            .format('YYYY-MM-DD') === tidsperiode2.fom
    );
};

const erLike = (uttaksperiode1: UttaksPeriodeDto, uttaksperiode2: UttaksPeriodeDto): boolean => {
    return _.isEqual(
        getRelevanteFelterForSammenligning(uttaksperiode1),
        getRelevanteFelterForSammenligning(uttaksperiode2)
    );
};

const getRelevanteFelterForSammenligning = (uttaksperiode: UttaksPeriodeDto) => {
    const { periode, trekkDager, manueltBehandlet, ...relevanteFelter } = uttaksperiode;
    return relevanteFelter;
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

    if (forelder === undefined) {
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
    }
    return forelder === Rolle.mor ? UttaksplanColor.purple : UttaksplanColor.blue;
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

export const getAntallUttaksdagerITidsperiode = (tidsperiode: Tidsperiode): number => {
    const fom = moment(tidsperiode.fom);
    const tom = moment(tidsperiode.tom);
    let antall = 0;
    while (fom.isSameOrBefore(tom, 'day')) {
        if (fom.isoWeekday() < 6) {
            antall++;
        }
        fom.add(24, 'hours');
    }
    return antall;
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

const erHullMellomPerioder = (periode: Periode, nestePeriode?: Periode) => {
    return (
        nestePeriode &&
        finnNesteMuligeUttaksdag(periode.tidsperiode.tom) !== nestePeriode.tidsperiode.fom &&
        (nestePeriode as Uttaksperiode).samtidigUttak === false
    );
};

const harAnnenForelderSamtidigUttakISammePeriode = (periode: Periode, perioder: Periode[]): boolean =>
    periode.type === PeriodeType.Uttak
        ? perioder
              .filter((p) => (p as Uttaksperiode).samtidigUttak)
              .some(
                  (p) => (p as Uttaksperiode).gjelderAnnenPart === true && _.isEqual(periode.tidsperiode, p.tidsperiode)
              )
        : false;
