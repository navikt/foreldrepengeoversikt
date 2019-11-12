import { PeriodeDto, StønadskontoType, PeriodeResultatType } from 'app/api/types/UttaksplanDto';
import { PeriodeType } from 'app/types/uttaksplan/Periode';
import { Rolle } from 'app/types/Rolle';
import { isEqual } from 'lodash';
import { erSammenhengende } from './periodeUtils';
import moment from 'moment';

export const getPeriodetype = (
    periode: PeriodeDto
): PeriodeType.Opphold | PeriodeType.Utsettelse | PeriodeType.Uttak | PeriodeType.TaptPeriode => {
    if (erTaptPeriode(periode)) {
        return PeriodeType.TaptPeriode;
    }

    if (periode.oppholdAarsak) {
        return PeriodeType.Opphold;
    }

    return periode.stønadskontotype && periode.utsettelsePeriodeType === undefined
        ? PeriodeType.Uttak
        : PeriodeType.Utsettelse;
};

export const getForelderForPeriode = (periode: PeriodeDto, søkerErFarEllerMedmor: boolean): Rolle => {
    if (periode.gjelderAnnenPart) {
        return søkerErFarEllerMedmor ? Rolle.mor : Rolle.farMedmor;
    }
    return søkerErFarEllerMedmor ? Rolle.farMedmor : Rolle.mor;
};

export const getGraderingsprosent = (periode: PeriodeDto): number => {
    return 100 - periode.arbeidstidprosent;
};

export const fjernIrrelevanteTaptePerioder = (periode: PeriodeDto, perioder: PeriodeDto[]) => {
    if (erDuplikatPeriodePgaFlereArbeidsforhold(periode, perioder)) {
        return !(erTaptPeriode(periode) && periode.stønadskontotype === StønadskontoType.ForeldrepengerFørFødsel);
    }

    return (
        !(erTaptPeriode(periode) && periode.stønadskontotype === StønadskontoType.ForeldrepengerFørFødsel) &&
        !(erTaptPeriode(periode) && perioder.some((p) => isEqual(p.periode.fom, periode.periode.fom)))
    );
};

export const slåSammenLikeOgSammenhengendeUttaksperioder = (perioder: PeriodeDto[]): PeriodeDto[] => {
    if (perioder.length <= 1) {
        return perioder;
    }

    return perioder.reduce((uttaksperiodeAccumulator: PeriodeDto[], periode) => {
        const previousUttaksperiode = uttaksperiodeAccumulator[uttaksperiodeAccumulator.length - 1];
        if (skalKunneSlåSammenUttaksperioer(previousUttaksperiode, periode)) {
            uttaksperiodeAccumulator.pop();
            uttaksperiodeAccumulator.push({
                ...previousUttaksperiode,
                trekkDager: previousUttaksperiode.trekkDager + periode.trekkDager,
                periode: {
                    ...previousUttaksperiode.periode,
                    tom: periode.periode.tom
                }
            });
        } else {
            uttaksperiodeAccumulator.push(periode);
        }
        return uttaksperiodeAccumulator;
    }, []);
};

export const skalKunneSlåSammenUttaksperioer = (periode1?: PeriodeDto, periode2?: PeriodeDto): boolean => {
    return periode1 === undefined || periode2 === undefined
        ? false
        : erSammenhengende(periode1.periode, periode2.periode) && erLike(periode1, periode2);
};

export const erTaptPeriode = (uttaksperiodeDto: PeriodeDto) => {
    return (
        (uttaksperiodeDto.periodeResultatType === PeriodeResultatType.Avslått &&
            uttaksperiodeDto.utbetalingsprosent === 0) ||
        (uttaksperiodeDto.trekkDager > 0 && uttaksperiodeDto.utbetalingsprosent === 0)
    );
};

export const erEnAvslåttPeriodeEtterSisteInnvilgetPeriode = (periode: PeriodeDto, perioder: PeriodeDto[]): boolean => {
    return (
        periode.periodeResultatType === PeriodeResultatType.Avslått &&
        perioder.some(
            (p) =>
                moment(p.periode.fom).isSameOrAfter(periode.periode.fom, 'days') &&
                p.periodeResultatType === PeriodeResultatType.Innvilget
        )
    );
};

export const erLike = (periode1: PeriodeDto, periode2: PeriodeDto): boolean => {
    return isEqual(getRelevanteFelterForSammenslåing(periode1), getRelevanteFelterForSammenslåing(periode2));
};

const getRelevanteFelterForSammenslåing = ({
    periode,
    trekkDager,
    utbetalingsprosent,
    manueltBehandlet,
    arbeidsgiverInfo,
    ...relevanteFelter
}: PeriodeDto) => {
    return relevanteFelter;
};

export const finnDuplikatePerioderPgaArbeidsforohld = (periode: PeriodeDto, uttaksperiodeDtoListe: PeriodeDto[]) => {
    return uttaksperiodeDtoListe
        .filter((p) => periode !== p)
        .filter((p) =>
            isEqual(
                getFelterForSammenligningAvDuplikatePerioderPgaArbeidsforhold(p),
                getFelterForSammenligningAvDuplikatePerioderPgaArbeidsforhold(periode)
            )
        );
};

export const getFelterForSammenligningAvDuplikatePerioderPgaArbeidsforhold = ({
    arbeidsgiverInfo,
    arbeidstidprosent,
    trekkDager,
    utbetalingsprosent,
    ...uttaksperiodeDtoUtenArbeidsgiverInfo
}: PeriodeDto) => {
    return uttaksperiodeDtoUtenArbeidsgiverInfo;
};

export const erDuplikatPeriodePgaFlereArbeidsforhold = (
    periode: PeriodeDto,
    uttaksperiodeDtoListe: PeriodeDto[]
): boolean => {
    return finnDuplikatePerioderPgaArbeidsforohld(periode, uttaksperiodeDtoListe).length > 0;
};

const reduceDuplikateSaksperioderGrunnetArbeidsforhold = (
    resultatPerioder: PeriodeDto[],
    periode: PeriodeDto,
    index: number,
    perioder: PeriodeDto[]
) => {
    if (erDuplikatPeriodePgaFlereArbeidsforhold(periode, perioder)) {
        if (periode.graderingInnvilget && periode.arbeidstidprosent > 0) {
            resultatPerioder.push(periode);
            return resultatPerioder;
        }

        if (!periode.graderingInnvilget && !erDuplikatPeriodePgaFlereArbeidsforhold(periode, resultatPerioder)) {
            resultatPerioder.push(periode);
            return resultatPerioder;
        }
        return resultatPerioder;
    }
    resultatPerioder.push(periode);
    return resultatPerioder;
};

export const cleanupUttaksplanDto = (uttaksperioderDto: PeriodeDto[]): PeriodeDto[] => {
    const tmp = uttaksperioderDto.filter((p) => !erEnAvslåttPeriodeEtterSisteInnvilgetPeriode(p, uttaksperioderDto));
    return slåSammenLikeOgSammenhengendeUttaksperioder(
        tmp
            .reduce(reduceDuplikateSaksperioderGrunnetArbeidsforhold, [])
            .filter((p) => fjernIrrelevanteTaptePerioder(p, uttaksperioderDto))
    );
};
