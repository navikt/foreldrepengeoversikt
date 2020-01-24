import { PeriodeDto, StønadskontoType, PeriodeResultatType } from 'app/api/types/UttaksplanDto';
import { PeriodeType } from 'app/types/uttaksplan/Periode';
import { Rolle } from 'app/types/Rolle';
import { isEqual } from 'lodash';
import { erSammenhengende } from './periodeUtils';

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

export const getGraderingsprosent = (periode: PeriodeDto): string | undefined => {
    return periode.arbeidstidprosent ? (100 - periode.arbeidstidprosent).toFixed(0) : undefined;
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

    return perioder.reduce((periodeResult: PeriodeDto[], periode) => {
        const previousUttaksperiode = periodeResult[periodeResult.length - 1];
        if (skalKunneSlåSammenUttaksperioder(previousUttaksperiode, periode)) {
            periodeResult.pop();
            periodeResult.push({
                ...previousUttaksperiode,
                trekkDager: previousUttaksperiode.trekkDager + periode.trekkDager,
                periode: {
                    ...previousUttaksperiode.periode,
                    tom: periode.periode.tom
                }
            });
        } else {
            periodeResult.push(periode);
        }
        return periodeResult;
    }, []);
};

export const skalKunneSlåSammenUttaksperioder = (periode1?: PeriodeDto, periode2?: PeriodeDto): boolean => {
    return periode1 === undefined || periode2 === undefined
        ? false
        : erSammenhengende(periode1.periode, periode2.periode) && erLike(periode1, periode2);
};

export const erTaptPeriode = (perioder: PeriodeDto) => {
    return (
        (perioder.periodeResultatType === PeriodeResultatType.Avslått && perioder.utbetalingsprosent === 0) ||
        (perioder.trekkDager > 0 && perioder.utbetalingsprosent === 0)
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
    uttakArbeidType,
    ...relevanteFelter
}: PeriodeDto) => {
    return relevanteFelter;
};

export const finnDuplikatePerioderPgaArbeidsforohld = (periode: PeriodeDto, perioder: PeriodeDto[]) => {
    return perioder
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
    uttakArbeidType,
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
        if (periode.graderingInnvilget && periode.arbeidstidprosent && periode.arbeidstidprosent > 0) {
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
    return slåSammenLikeOgSammenhengendeUttaksperioder(
        uttaksperioderDto
            .reduce(reduceDuplikateSaksperioderGrunnetArbeidsforhold, [])
            .filter((p) => fjernIrrelevanteTaptePerioder(p, uttaksperioderDto))
    );
};
