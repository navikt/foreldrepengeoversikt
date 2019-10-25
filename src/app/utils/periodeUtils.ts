import moment from 'moment';
import { UttaksPeriodeDto, StønadskontoType, OppholdsÅrsak, PeriodeResultatType } from 'app/api/types/UttaksplanDto';
import { Tidsperiode } from 'app/types/Tidsperiode';
import { isEqual } from 'lodash';
import { UttaksplanColor } from 'app/types/uttaksplan/UttaksplanColor';
import { InjectedIntl } from 'react-intl';
import Periode, { PeriodeType, Uttaksperiode } from 'app/types/uttaksplan/Periode';
import { Rolle } from 'app/types/Rolle';

const ANTALL_UTTAKSDAGER_PR_UKE: number = 5;

export const finnTidligerePerioder = (perioder: Periode[]): Periode[] => {
    return perioder.filter((periode) => moment(periode.tidsperiode.tom).isBefore(moment(), 'days'));
};

export const finnNåværendePerioder = (perioder: Periode[]): Periode[] => {
    return perioder.filter((periode) =>
        moment().isBetween(periode.tidsperiode.fom, periode.tidsperiode.tom, 'days', '[]')
    );
};

export const finnFremtidigePerioder = (perioder: Periode[]): Periode[] => {
    return perioder.filter((periode) => moment(periode.tidsperiode.fom).isAfter(moment(), 'days'));
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
                trekkDager: previousUttaksperiode.trekkDager + uttaksperiode.trekkDager,
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
            .isSame(moment(tidsperiode2.fom), 'days')
    );
};

const erLike = (uttaksperiode1: UttaksPeriodeDto, uttaksperiode2: UttaksPeriodeDto): boolean => {
    return isEqual(
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
        .find((p) => isEqual(periode.tidsperiode.fom, p.tidsperiode.fom));
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

export const skalVisesIPeriodeListe = (periode: Periode, perioder: Periode[]) => {
    return perioder.length <= 1
        ? true
        : ((periode as Uttaksperiode).samtidigUttak !== true &&
              !harAnnenForelderSamtidigUttakISammePeriode(periode, perioder)) ||
              (harAnnenForelderSamtidigUttakISammePeriode(periode, perioder) && !periode.gjelderAnnenPart);
};

export const erTaptPeriode = (uttaksperiodeDto: UttaksPeriodeDto) => {
    return (
        (uttaksperiodeDto.periodeResultatType === PeriodeResultatType.Avslått &&
            uttaksperiodeDto.utbetalingsprosent === 0) ||
        (uttaksperiodeDto.trekkDager > 0 && uttaksperiodeDto.utbetalingsprosent === 0)
    );
};

export const fjernIrrelevanteTaptePerioder = (periode: UttaksPeriodeDto, _: number, perioder: UttaksPeriodeDto[]) =>
    !(erTaptPeriode(periode) && periode.stønadskontotype === StønadskontoType.ForeldrepengerFørFødsel) &&
    !(erTaptPeriode(periode) && perioder.some((p) => isEqual(p.periode.fom, periode.periode.fom)));

export const fjernAvslåttePerioderEtterSisteInnvilgetPeriode = (perioder: UttaksPeriodeDto[]) => {
    while (perioder[perioder.length - 1].periodeResultatType === PeriodeResultatType.Avslått) {
        perioder.pop();
    }
    return perioder;
};

export const getPeriodetype = (
    uttaksperiodeDto: UttaksPeriodeDto
): PeriodeType.Opphold | PeriodeType.Utsettelse | PeriodeType.Uttak | PeriodeType.TaptPeriode => {
    if (erTaptPeriode(uttaksperiodeDto)) {
        return PeriodeType.TaptPeriode;
    }

    if (uttaksperiodeDto.oppholdAarsak) {
        return PeriodeType.Opphold;
    }

    return uttaksperiodeDto.stønadskontotype && uttaksperiodeDto.utsettelsePeriodeType === undefined
        ? PeriodeType.Uttak
        : PeriodeType.Utsettelse;
};

export const getForelderForPeriode = (uttaksperiodeDto: UttaksPeriodeDto, søkerErFarEllerMedmor: boolean): Rolle => {
    if (uttaksperiodeDto.gjelderAnnenPart) {
        return søkerErFarEllerMedmor ? Rolle.mor : Rolle.farMedmor;
    }
    return søkerErFarEllerMedmor ? Rolle.farMedmor : Rolle.mor;
};
