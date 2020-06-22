import { PeriodeDto } from 'app/api/types/UttaksplanDto';
import {
    PeriodeType,
    Utsettelsesperiode,
    Uttaksperiode,
    Oppholdsperiode,
    TaptPeriode,
} from 'app/types/uttaksplan/Periode';
import { getAntallUttaksdagerITidsperiode } from 'app/utils/periodeUtils';
import { getPeriodetype, getForelderForPeriode, getGraderingsprosent } from './uttaksplanDtoUtils';

export const uttaksperiodeDtoToPeriode = (uttaksperiodeDto: PeriodeDto, søkerErFarEllerMedmor: boolean) => {
    switch (getPeriodetype(uttaksperiodeDto)) {
        case PeriodeType.Uttak:
            return periodeDtoUTottaksperiode(uttaksperiodeDto, søkerErFarEllerMedmor);
        case PeriodeType.Utsettelse:
            if (uttaksperiodeDto.utbetalingsprosent > 0) {
                return periodeDtoUTottaksperiode(uttaksperiodeDto, søkerErFarEllerMedmor);
            }
            return periodeDtoToUtsettelsesperiode(uttaksperiodeDto, søkerErFarEllerMedmor);
        case PeriodeType.Opphold:
            return periodeDtoUToOppholdsperiode(uttaksperiodeDto, søkerErFarEllerMedmor);
        case PeriodeType.TaptPeriode:
            return periodeDtoUToTaptPeriode(uttaksperiodeDto, søkerErFarEllerMedmor);
    }
};

const periodeDtoUToTaptPeriode = (uttaksperiodeDto: PeriodeDto, søkerErFarEllerMedmor: boolean): TaptPeriode => ({
    type: PeriodeType.TaptPeriode,
    tidsperiode: uttaksperiodeDto.periode,
    antallUttaksdager: getAntallUttaksdagerITidsperiode(uttaksperiodeDto.periode),
    forelder: getForelderForPeriode(uttaksperiodeDto, søkerErFarEllerMedmor),
    stønadskontotype: uttaksperiodeDto.stønadskontotype,
});

const periodeDtoUToOppholdsperiode = (
    uttaksperiodeDto: PeriodeDto,
    søkerErFarEllerMedmor: boolean
): Oppholdsperiode => {
    return {
        type: PeriodeType.Opphold,
        gjelderAnnenPart: true,
        tidsperiode: uttaksperiodeDto.periode,
        forelder: getForelderForPeriode(uttaksperiodeDto, søkerErFarEllerMedmor),
        antallUttaksdager: getAntallUttaksdagerITidsperiode(uttaksperiodeDto.periode),
        oppholdsårsak: uttaksperiodeDto.oppholdAarsak!,
    };
};

const periodeDtoUTottaksperiode = (uttaksperiodeDto: PeriodeDto, søkerErFarEllerMedmor: boolean): Uttaksperiode => {
    return {
        type: PeriodeType.Uttak,
        gjelderAnnenPart: uttaksperiodeDto.gjelderAnnenPart,
        tidsperiode: uttaksperiodeDto.periode,
        forelder: getForelderForPeriode(uttaksperiodeDto, søkerErFarEllerMedmor),
        antallUttaksdager: getAntallUttaksdagerITidsperiode(
            uttaksperiodeDto.periode,
            getGraderingsprosent(uttaksperiodeDto),
            uttaksperiodeDto.samtidigUttaksprosent
        ),
        stønadskontotype: uttaksperiodeDto.stønadskontotype,
        graderingInnvilget:
            uttaksperiodeDto.graderingInnvilget !== undefined ? uttaksperiodeDto.graderingInnvilget : false,
        graderingsprosent: getGraderingsprosent(uttaksperiodeDto) || '0',
        samtidigUttak: uttaksperiodeDto.samtidigUttak,
        samtidigUttaksprosent: uttaksperiodeDto.samtidigUttaksprosent,
    };
};

const periodeDtoToUtsettelsesperiode = (
    uttaksperiodeDto: PeriodeDto,
    søkerErFarEllerMedmor: boolean
): Utsettelsesperiode => {
    return {
        type: PeriodeType.Utsettelse,
        gjelderAnnenPart: uttaksperiodeDto.gjelderAnnenPart,
        tidsperiode: uttaksperiodeDto.periode,
        forelder: getForelderForPeriode(uttaksperiodeDto, søkerErFarEllerMedmor),
        antallUttaksdager: getAntallUttaksdagerITidsperiode(uttaksperiodeDto.periode),
        årsak: uttaksperiodeDto.utsettelsePeriodeType,
    };
};
